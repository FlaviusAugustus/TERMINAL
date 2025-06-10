using MediatR;
using Microsoft.EntityFrameworkCore;
using Terminal.Backend.Application.Queries.Samples.Search;
using Terminal.Backend.Core.Entities;

namespace Terminal.Backend.Infrastructure.DAL.Handlers.Samples.Search;

internal sealed class SearchSampleAmountQueryHandler : IRequestHandler<SearchSampleAmountQuery, int>
{
    private readonly DbSet<Sample> _samples;

    public SearchSampleAmountQueryHandler(TerminalDbContext dbContext)
    {
        _samples = dbContext.Samples;
    }

    public async Task<int> Handle(SearchSampleAmountQuery request, CancellationToken ct)
    {
        var amount = _samples
            .AsNoTracking()
            .Count();

        return amount;
    }
}