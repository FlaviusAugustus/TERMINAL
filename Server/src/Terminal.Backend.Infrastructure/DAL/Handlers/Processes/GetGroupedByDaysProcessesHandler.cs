using System.Collections;
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
        Dictionary<string, List<GetGroupedByDaysProcessesDto.ProcessDto>> dictionary = Enumerable
            .Range(0, request.Days)
            .Select(offset => DateTime.UtcNow.AddDays(-offset).ToShortDateString())
            .ToDictionary(date => date, _ => new List<GetGroupedByDaysProcessesDto.ProcessDto>());
        
        
        await _processes
            .Where(p => DateTime.UtcNow.AddDays(-request.Days).Date <= p.CreatedAtUtc.Date)
            .ForEachAsync(p =>
                {
                    dictionary.TryGetValue(p.CreatedAtUtc.Date.ToShortDateString(), out var list);
                    list?.Add(new GetGroupedByDaysProcessesDto.ProcessDto(p.Id, p.Code, p.Projects.Select(p => p.Name), p.CreatedAtUtc.ToString("o"),
                        p.Comment));
                }, cancellationToken);
        return new ()
        {
            GroupedByDaysProcesses = dictionary 
        };
    }
    
}