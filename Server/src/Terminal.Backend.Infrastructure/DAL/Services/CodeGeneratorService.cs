using Microsoft.EntityFrameworkCore;
using Terminal.Backend.Application.Abstractions;
using Terminal.Backend.Core.Entities;
using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Infrastructure.DAL.Services
{
    internal sealed class CodeGeneratorService : ICodeGeneratorService
    {
        private readonly TerminalDbContext _dbContext;

        public CodeGeneratorService(TerminalDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Code> GenerateNextCodeAsync(Prefix prefix, CancellationToken ct = default)
        {
            await using var transaction = await _dbContext.Database.BeginTransactionAsync(ct);

            try
            {
                var prefixValue = prefix.Value;

                var counter = await _dbContext.PrefixCounters
                    .FromSqlInterpolated($"SELECT * FROM \"PrefixCounters\" WHERE \"Prefix\" = {prefixValue} FOR UPDATE")
                    .SingleOrDefaultAsync(ct);

                if (counter == null)
                {
                    counter = new PrefixCounter(prefixValue);
                    _dbContext.PrefixCounters.Add(counter);
                }
                var nextValue = counter.Increment();
                await _dbContext.SaveChangesAsync(ct);
                await transaction.CommitAsync(ct);
                var sequentialNumber = SequentialNumber.Create(nextValue);
                return Code.Create(prefix, sequentialNumber);
            }
            catch (Exception)
            {
                await transaction.RollbackAsync(ct);
                throw;
            }
        }
    }
}
