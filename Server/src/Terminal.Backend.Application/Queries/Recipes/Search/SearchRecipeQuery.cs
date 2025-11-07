using MediatR;
using Terminal.Backend.Application.DTO.Recipes;
using Terminal.Backend.Application.Queries.QueryParameters;

namespace Terminal.Backend.Application.Queries.Recipes.Search;

public class SearchRecipeQuery : IRequest<GetSearchedRecipesDto>
{
    public string SearchPhrase { get; set; }
    public PagingParameters Parameters { get; set; }

    public SearchRecipeQuery(string searchPhrase, int pageNumber, int pageSize)
    {
        SearchPhrase = searchPhrase;
        Parameters = new PagingParameters { PageNumber = pageNumber, PageSize = pageSize };
    }
}