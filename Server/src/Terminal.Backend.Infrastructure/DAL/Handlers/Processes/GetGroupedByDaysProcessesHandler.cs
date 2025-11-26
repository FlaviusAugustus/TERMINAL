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

        var processes = await _processes
            .AsNoTracking()
            .Where(p => dateLimit <= p.CreatedAtUtc.Date)
            .GroupBy(p => p.CreatedAtUtc.Date)
            .Select(g =>
                new
                {
                    Key = g.Key.Date.ToString("MM/dd/yyyy"),
                    Items = g.Select(p =>
                        new GetGroupedByDaysProcessesDto.ProcessDto(
                            p.Id,
                            p.Code,
                            p.Projects.Select(p => p.Name),
                            p.Comment
                        ))
                })
            .ToDictionaryAsync(
                g => g.Key,
                g => g.Items.LongCount(),
                cancellationToken
            );
            

    return new ()
        {
            GroupedByDaysProcesses = processes
        };
    }
    
}