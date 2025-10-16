using MediatR;
using Terminal.Backend.Application.DTO.Tags;
using Terminal.Backend.Application.Queries.QueryParameters;

namespace Terminal.Backend.Application.Queries.Tags.Search;

public class SearchTagQuery : IRequest<GetSearchedTagsDto>
{
    public string SearchPhrase { get; set; }
    public PagingParameters Parameters { get; set; }

    public SearchTagQuery(string searchPhrase, int pageNumber, int pageSize)
    {
        SearchPhrase = searchPhrase;
        Parameters = new PagingParameters { PageNumber = pageNumber, PageSize = pageSize };
    }
}