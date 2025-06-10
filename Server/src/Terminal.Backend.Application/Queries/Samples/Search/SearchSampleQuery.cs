using MediatR;
using Terminal.Backend.Application.DTO.Samples;
using Terminal.Backend.Application.Queries.QueryParameters;

namespace Terminal.Backend.Application.Queries.Samples.Search;

public sealed class SearchSampleQuery : IRequest<GetSearchedSamplesDto>
{
    public string SearchPhrase { get; set; }

    public PagingParameters Parameters { get; set; }

    public SearchSampleQuery(string phrase, int pageNumber, int pageSize)
    {
        SearchPhrase = phrase;
        Parameters = new PagingParameters { PageNumber = pageNumber, PageSize = pageSize };
    }
}