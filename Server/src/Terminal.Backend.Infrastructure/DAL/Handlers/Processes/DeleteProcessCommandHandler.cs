using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Terminal.Backend.Application.Exceptions;
using Terminal.Backend.Application.Commands.Process.Delete;

namespace Terminal.Backend.Infrastructure.DAL.Handlers.Processes
{

    internal sealed class DeleteProcessCommandHandler : IRequestHandler<DeleteProcessCommand>
    {
        private readonly TerminalDbContext _dbContext;

        public DeleteProcessCommandHandler(TerminalDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task Handle(DeleteProcessCommand request, CancellationToken cancellationToken)
        {
            var processId = request.Id;
            await using var transaction = await _dbContext.Database.BeginTransactionAsync(cancellationToken);

            try
            {
                var process = await _dbContext.Processes
                    .FirstOrDefaultAsync(p => p.Id == processId, cancellationToken);

                if (process is null)
                {
                    throw new ProcessNotFoundException();
                }

                var prefixValue = process.Code.Prefix.Value;
                var counter = await _dbContext.PrefixCounters
                    .FromSqlInterpolated($"SELECT * FROM \"PrefixCounters\" WHERE \"Prefix\" = {prefixValue} FOR UPDATE")
                    .SingleOrDefaultAsync(cancellationToken);

                if (counter != null && process.Code.Number.Value == counter.LastValue)
                {
                    counter.Decrement();
                }

                _dbContext.Processes.Remove(process);
                await _dbContext.SaveChangesAsync(cancellationToken);
                await transaction.CommitAsync(cancellationToken);
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync(cancellationToken);
                throw;
            }
        }
    }
}
