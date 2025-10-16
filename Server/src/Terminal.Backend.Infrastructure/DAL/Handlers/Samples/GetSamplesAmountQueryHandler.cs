using MediatR;
using Microsoft.EntityFrameworkCore;
using Terminal.Backend.Application.Queries.Samples.Get;
using Terminal.Backend.Core.Entities;

namespace Terminal.Backend.Infrastructure.DAL.Handlers.Samples;

internal sealed class GetSamplesAmountQueryHandler : IRequestHandler<GetSamplesAmountQuery, int>
{
    private readonly DbSet<Process> _samples;

    public GetSamplesAmountQueryHandler(TerminalDbContext dbContext)
    {
        _samples = dbContext.Samples;
    }

    public async Task<int> Handle(GetSamplesAmountQuery request, CancellationToken ct)
    {
        var amount = _samples
            .AsNoTracking()
            .Count();

        return amount;
    }
}