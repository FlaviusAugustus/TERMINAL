using MediatR;
using Terminal.Backend.Application.DTO.Codes;
using Terminal.Backend.Application.Queries.QueryParameters;

namespace Terminal.Backend.Application.Queries.Prefixes.Get;

public sealed class GetPrefixesQuery:IRequest<GetPrefixesDto>
{
    public PagingParameters Parameters { get; set; }

    public OrderingParameters OrderingParameters { get; set; }

    public GetPrefixesQuery(int pageSize, int  pageNumber,  bool desc)
    {
        Parameters = new PagingParameters { PageNumber = pageNumber, PageSize = pageSize };
        OrderingParameters = new OrderingParameters { OrderBy = "Prefix", Desc = desc };
    }
}