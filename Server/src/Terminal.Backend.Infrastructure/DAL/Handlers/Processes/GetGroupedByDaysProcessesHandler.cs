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
                new GetGroupedByDaysProcessesDto.GroupedAmount
                (
                    g.Key.Date.ToString("MM/dd/yyyy"),
                    g.Select(p =>
                        new {
                            p.Id,
                            p.Code,
                            p.Comment
                        }).Count()
                ))
            .ToListAsync(cancellationToken);

    return new ()
        {
            GroupedByDaysProcesses =  processes
        };
    }
    
}