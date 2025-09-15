using MediatR;
using Microsoft.EntityFrameworkCore;
using Terminal.Backend.Application.Queries.Tags.Search;
using Terminal.Backend.Core.Entities;

namespace Terminal.Backend.Infrastructure.DAL.Handlers.Tags.Search;

internal sealed class SearchTagAmountQueryHandler : IRequestHandler<SearchTagAmountQuery, int>
{
  private readonly DbSet<Tag> _tags;

  public SearchTagAmountQueryHandler(TerminalDbContext dbContext)
  {
    _tags = dbContext.Tags;
  }

  public async Task<int> Handle(SearchTagAmountQuery request, CancellationToken ct)
  {
    var amount = _tags
      .AsNoTracking()
      .Count();

    return amount;
  }
}