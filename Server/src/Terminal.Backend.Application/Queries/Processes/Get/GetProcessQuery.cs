using MediatR;
using Terminal.Backend.Application.DTO.Processes;

namespace Terminal.Backend.Application.Queries.Processes.Get;

public class GetProcessQuery : IRequest<GetProcessDto?>
{
    public Guid Id { get; set; }
}