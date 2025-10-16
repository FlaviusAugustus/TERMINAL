using MediatR;
using Microsoft.EntityFrameworkCore;
using Terminal.Backend.Application.DTO.Samples;
using Terminal.Backend.Application.Queries.Samples.Get;
using Terminal.Backend.Core.Entities;

namespace Terminal.Backend.Infrastructure.DAL.Handlers.Samples;

internal sealed class GetRecentSamplesQueryHandler :
    IRequestHandler<GetRecentSamplesQuery, GetRecentSamplesDto>
{
    private readonly DbSet<Process> _samples;

    public GetRecentSamplesQueryHandler(TerminalDbContext dbContext)
    {
        _samples = dbContext.Samples;
    }

    public async Task<GetRecentSamplesDto> Handle(GetRecentSamplesQuery request,
        CancellationToken cancellationToken)
        => new()
        {
            RecentSamples = await _samples
                .OrderByDescending(m => m.CreatedAtUtc)
                .Take(request.Length)
                .Select(m =>
                    new GetSamplesDto.SampleDto(m.Id, m.Code.Value, m.Project.Name, m.CreatedAtUtc.ToString("o"),
                        m.Comment))
                .ToListAsync(cancellationToken)
        };
}