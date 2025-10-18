using MediatR;
using Terminal.Backend.Application.DTO.Processes;
using Terminal.Backend.Application.Queries.QueryParameters;

namespace Terminal.Backend.Application.Queries.Processes.Get;

public sealed class GetProcessesQuery : IRequest<GetProcessesDto>
{
    public PagingParameters Parameters { get; set; }
    public OrderingParameters OrderingParameters { get; set; }

    public GetProcessesQuery(int pageNumber, int pageSize, string orderBy, bool desc)
    {
        Parameters = new PagingParameters { PageNumber = pageNumber, PageSize = pageSize };
        OrderingParameters = new OrderingParameters { OrderBy = orderBy, Desc = desc };
    }
}