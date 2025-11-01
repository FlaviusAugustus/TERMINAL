using MediatR;
using Microsoft.EntityFrameworkCore;
using Terminal.Backend.Application.Queries.Processes.Search;
using Terminal.Backend.Core.Entities;

namespace Terminal.Backend.Infrastructure.DAL.Handlers.Samples.Search;

internal sealed class SearchProcessAmountQueryHandler : IRequestHandler<SearchProcessAmountQuery, int>
{
  private readonly DbSet<Process> _samples;

  public SearchProcessAmountQueryHandler(TerminalDbContext dbContext)
  {
    _samples = dbContext.Processes;
  }

  public async Task<int> Handle(SearchProcessAmountQuery request, CancellationToken ct)
  {
    var amount = _samples
      .AsNoTracking()
      .Count();

    return amount;
  }
}