using MediatR;
using Microsoft.EntityFrameworkCore;
using Terminal.Backend.Application.DTO.Processes;
using Terminal.Backend.Application.Queries.Processes.Get;
using Terminal.Backend.Core.Entities;

namespace Terminal.Backend.Infrastructure.DAL.Handlers.Processes;

internal sealed class GetGroupedByDaysProcessesHandler: 
    IRequestHandler<GetGroupedByDaysProcessesQuery, GetGroupedByDaysProcessesDto>
{
    private readonly DbSet<Process> _processes;

    public GetGroupedByDaysProcessesHandler(TerminalDbContext dbContext)
    {
        _processes = dbContext.Processes;
    }

    public async Task<GetGroupedByDaysProcessesDto> Handle(GetGroupedByDaysProcessesQuery request,
        CancellationToken cancellationToken)
    {
        var dateLimit = DateTime.UtcNow.AddDays(-request.Days).Date;

        var processes = _processes
            .AsNoTracking()
            .Where(p => dateLimit <= p.CreatedAtUtc.Date)
            .Select(p => new
            {
                p.Id,
                p.Code,
                p.CreatedAtUtc.Date,
                Projects = p.Projects.Select(p => p.Name),
                p.Comment
            })
            .GroupBy(p => p.Date);

    return new ()
        {
            GroupedByDaysProcesses = processes.ToDictionary(
                p => p.Key.ToString("MM/dd/yyyy"), 
                p => 
                    p.Select(p => new GetGroupedByDaysProcessesDto.ProcessDto(
                            p.Id, 
                            p.Code,
                            p.Projects,
                            p.Comment))
                    .ToList())
        };
    }
    
}