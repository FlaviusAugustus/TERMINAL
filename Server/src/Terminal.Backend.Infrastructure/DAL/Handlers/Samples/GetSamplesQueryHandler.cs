using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Terminal.Backend.Application.DTO.Processes;
using Terminal.Backend.Application.Queries.Processes.Get;
using Terminal.Backend.Core.Entities;

namespace Terminal.Backend.Infrastructure.DAL.Handlers.Samples;

internal sealed class GetSamplesQueryHandler : IRequestHandler<GetProcessesQuery, GetProcessesDto>
{
    private readonly DbSet<Process> _samples;

    public GetSamplesQueryHandler(TerminalDbContext dbContext)
    {
        _samples = dbContext.Processes;
    }

    public async Task<GetProcessesDto> Handle(GetProcessesQuery request, CancellationToken ct)
    {
        var samples = await _samples
            .AsNoTracking()
            .Include(m => m.Projects)
            .Include(m => m.Tags)
            .OrderBy(request.OrderingParameters)
            .Paginate(request.Parameters)
            .Select(m => new GetProcessesDto.ProcessDto(
                m.Id, m.Sample.Value, m.Projects.Select(p => p.Name), m.CreatedAtUtc.ToString("o"), m.Comment))
            .ToListAsync(ct);

        return new GetProcessesDto { Processes = samples };
    }
}