using MediatR;

namespace Terminal.Backend.Application.Queries.Processes.Get;

public sealed class GetProcessesAmountQuery : IRequest<int>
{
    public int Amount { get; set; }
}