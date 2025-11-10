using MediatR;
using Terminal.Backend.Application.DTO.Processes;
using Terminal.Backend.Application.Queries.QueryParameters;

namespace Terminal.Backend.Application.Queries.Processes.Search;

public sealed class SearchProcessQuery : IRequest<GetSearchedProcessesDto>
{
    public string SearchPhrase { get; set; }

    public PagingParameters Parameters { get; set; }

    public SearchProcessQuery(string phrase, int pageNumber, int pageSize)
    {
        SearchPhrase = phrase;
        Parameters = new PagingParameters { PageNumber = pageNumber, PageSize = pageSize };
    }
}