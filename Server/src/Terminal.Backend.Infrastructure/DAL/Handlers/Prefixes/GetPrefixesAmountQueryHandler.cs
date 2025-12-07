using MediatR;
using Microsoft.EntityFrameworkCore;
using Terminal.Backend.Application.Queries.Prefixes.Get;
using Terminal.Backend.Core.Entities;

namespace Terminal.Backend.Infrastructure.DAL.Handlers.Prefixes;

internal class GetPrefixesAmountQueryHandler : IRequestHandler<GetPrefixesAmountQuery, int>
{
    private readonly DbSet<PrefixCounter> _prefixes;

    public GetPrefixesAmountQueryHandler(TerminalDbContext context)
    {
        _prefixes = context.PrefixCounters;
    }
    
    public async Task<int> Handle(GetPrefixesAmountQuery request, CancellationToken ct)
    {
        var amount = _prefixes
            .AsNoTracking()
            .Count();

        return amount;
    }
}