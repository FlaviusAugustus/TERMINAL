using MediatR;

namespace Terminal.Backend.Application.Queries.Recipes.Search;

public sealed class SearchRecipeAmountQuery : IRequest<int>
{
  public int Amount { get; set; }
}