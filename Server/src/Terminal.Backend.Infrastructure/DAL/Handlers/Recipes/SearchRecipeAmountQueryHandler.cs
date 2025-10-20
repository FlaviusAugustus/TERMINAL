using MediatR;
using Microsoft.EntityFrameworkCore;
using Terminal.Backend.Application.Queries.Recipes.Search;
using Terminal.Backend.Core.Entities;

namespace Terminal.Backend.Infrastructure.DAL.Handlers.Recipes.Search;

internal sealed class SearchRecipeAmountQueryHandler : IRequestHandler<SearchRecipeAmountQuery, int>
{
  private readonly DbSet<Recipe> _recipes;

  public SearchRecipeAmountQueryHandler(TerminalDbContext dbContext)
  {
    _recipes = dbContext.Recipes;
  }

  public async Task<int> Handle(SearchRecipeAmountQuery request, CancellationToken ct)
  {
    var amount = _recipes
      .AsNoTracking()
      .Count();

    return amount;
  }
}