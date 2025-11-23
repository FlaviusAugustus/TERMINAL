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
            .Select(p => new GetGroupedByDaysProcessesDto.ProcessDto(
                p.Id, 
                p.Code,
                p.Projects.Select(p => p.Name),
                p.CreatedAtUtc.ToString("MM/dd/yyyy"),
                p.Comment));
        
        return new ()
        {
            GroupedByDaysProcesses = processes
                .ToList()
                .GroupBy(p => p.CreatedAtUtc)
                .ToDictionary(p => p.Key, p=> p.ToList())
        };
    }
    
}