using MediatR;
using Microsoft.EntityFrameworkCore;
using Terminal.Backend.Application.DTO.Processes;
using Terminal.Backend.Application.Queries.Processes.Get;
using Terminal.Backend.Core.Entities;

namespace Terminal.Backend.Infrastructure.DAL.Handlers.Processes;

internal sealed class GetRecentProcessesQueryHandler :
    IRequestHandler<GetRecentProcessesQuery, GetRecentProcessesDto>
{
    private readonly DbSet<Process> _processes;

    public GetRecentProcessesQueryHandler(TerminalDbContext dbContext)
    {
        _processes = dbContext.Processes;
    }

    public async Task<GetRecentProcessesDto> Handle(GetRecentProcessesQuery request,
        CancellationToken cancellationToken)
        => new()
        {
            RecentSamples = await _processes
                .OrderByDescending(m => m.CreatedAtUtc)
                .Take(request.Length)
                .Select(m =>
                    new GetProcessesDto.ProcessDto(m.Id, m.Code, m.Projects.Select(p => p.Name), m.CreatedAtUtc.ToString("o"),
                        m.Comment))
                .ToListAsync(cancellationToken)
        };
}