using MediatR;
using Terminal.Backend.Application.DTO.Processes;

namespace Terminal.Backend.Application.Queries.Processes.Get;

public sealed record GetGroupedByDaysProcessesQuery(int Days): IRequest<GetGroupedByDaysProcessesDto>;