using MediatR;
using Microsoft.EntityFrameworkCore;
using Terminal.Backend.Application.Queries.Projects.Search;
using Terminal.Backend.Core.Entities;

namespace Terminal.Backend.Infrastructure.DAL.Handlers.Projects.Search;

internal sealed class SearchProjectAmountQueryHandler : IRequestHandler<SearchProjectAmountQuery, int>
{
  private readonly DbSet<Project> _projects;

  public SearchProjectAmountQueryHandler(TerminalDbContext dbContext)
  {
    _projects = dbContext.Projects;
  }

  public async Task<int> Handle(SearchProjectAmountQuery request, CancellationToken ct)
  {
    var amount = _projects
      .AsNoTracking()
      .Count();

    return amount;
  }
}