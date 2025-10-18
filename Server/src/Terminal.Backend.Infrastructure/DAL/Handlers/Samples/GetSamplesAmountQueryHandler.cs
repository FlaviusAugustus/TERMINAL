using MediatR;
using Microsoft.EntityFrameworkCore;
using Terminal.Backend.Application.Queries.Processes.Get;
using Terminal.Backend.Core.Entities;

namespace Terminal.Backend.Infrastructure.DAL.Handlers.Samples;

internal sealed class GetSamplesAmountQueryHandler : IRequestHandler<GetProcessesAmountQuery, int>
{
    private readonly DbSet<Process> _samples;

    public GetSamplesAmountQueryHandler(TerminalDbContext dbContext)
    {
        _samples = dbContext.Processes;
    }

    public async Task<int> Handle(GetProcessesAmountQuery request, CancellationToken ct)
    {
        var amount = _samples
            .AsNoTracking()
            .Count();

        return amount;
    }
}