using MediatR;
using Terminal.Backend.Application.DTO.Projects;
using Terminal.Backend.Application.Queries.QueryParameters;

namespace Terminal.Backend.Application.Queries.Projects.Search;

public class SearchProjectQuery : IRequest<GetSearchedProjectsDto>
{
    public string SearchPhrase { get; set; }
    public PagingParameters Parameters { get; set; }

    public SearchProjectQuery(string searchPhrase, int pageNumber, int pageSize)
    {
        SearchPhrase = searchPhrase;
        Parameters = new PagingParameters { PageNumber = pageNumber, PageSize = pageSize };
    }
}