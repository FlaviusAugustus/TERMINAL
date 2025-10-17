namespace Terminal.Backend.Application.DTO.Recipes;

public class GetSearchedRecipesDto
{
  public IEnumerable<RecipeDto> Recipes { get; set; }

  public int TotalAmount { get; set; }

  public sealed record RecipeDto(Guid Id, string Name);

  public GetSearchedRecipesDto(IEnumerable<RecipeDto> recipes, int totalAmount)
  {
    Recipes = recipes;
    TotalAmount = totalAmount;
  }
}