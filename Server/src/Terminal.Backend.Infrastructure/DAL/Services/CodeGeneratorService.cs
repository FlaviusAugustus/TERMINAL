using Microsoft.EntityFrameworkCore;
using Terminal.Backend.Application.Abstractions;
using Terminal.Backend.Core.Entities;
using Terminal.Backend.Core.Exceptions;

namespace Terminal.Backend.Infrastructure.DAL.Services
{
    internal sealed class CodeGeneratorService : ICodeGeneratorService
    {
        private readonly TerminalDbContext _dbContext;

        public CodeGeneratorService(TerminalDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Code> GenerateNextCodeAsync(string prefix, CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(prefix))
            {
                throw new InvalidCodeFormatException("Prefix cannot be null or whitespace.");
            }

            string normalizedPrefix = prefix.ToUpper();

            if (!normalizedPrefix.EndsWith("X"))
            {
                throw new InvalidCodeFormatException("Prefix must end with 'X'.");
            }

            foreach (char c in normalizedPrefix)
            {
                if (c < 'A' || c > 'Z')
                {
                    throw new InvalidCodeFormatException("Prefix can only contain letters.");
                }
            }

            await using var transaction = await _dbContext.Database.BeginTransactionAsync(ct);

            try
            {
                var prefixValue = normalizedPrefix;

                var counter = _dbContext.PrefixCounters.Local
                                    .SingleOrDefault(pc => pc.Prefix == prefixValue);

                if (counter == null)
                {
                    counter = await _dbContext.PrefixCounters
                        .FromSqlInterpolated($"SELECT * FROM \"PrefixCounters\" WHERE \"Prefix\" = {prefixValue} FOR UPDATE")
                        .SingleOrDefaultAsync(ct);
                }
                if (counter == null)
                {
                    counter = new PrefixCounter(prefixValue);
                    _dbContext.PrefixCounters.Add(counter);
                }
                var nextValue = counter.Increment();
                return Code.Create(normalizedPrefix, nextValue);
            }
            catch (Exception)
            {
                await transaction.RollbackAsync(ct);
                throw;
            }
        }
    }
}