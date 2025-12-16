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
        var today = DateTime.UtcNow.Date;

        var processes = await _processes
            .AsNoTracking()
            .Where(p => dateLimit <= p.CreatedAtUtc.Date)
            .GroupBy(p => p.CreatedAtUtc.Date)
            .Select(g =>
                new
                {
                    Date = g.Key,
                    Count = g.Count()
                })
            .ToDictionaryAsync(x => x.Date, x => x.Count, cancellationToken);

        var result = Enumerable.Range(0, (today - dateLimit).Days + 1)
            .Select(offset => dateLimit.AddDays(offset))
            .Select(date =>
                new GetGroupedByDaysProcessesDto.GroupedAmount(
                    date.ToString("MM/dd/yyyy"),
                    processes.TryGetValue(date, out var count) ? count : 0
                )
            ).ToList();

        return new GetGroupedByDaysProcessesDto
        {
            GroupedByDaysProcesses = result
        };
    }
    
}