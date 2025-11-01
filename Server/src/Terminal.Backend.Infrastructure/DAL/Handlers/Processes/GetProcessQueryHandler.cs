using MediatR;
using Microsoft.EntityFrameworkCore;
using Terminal.Backend.Application.DTO.Processes;
using Terminal.Backend.Application.Queries.Processes.Get;

namespace Terminal.Backend.Infrastructure.DAL.Handlers.Samples;

internal class GetProcessQueryHandler : IRequestHandler<GetProcessQuery, GetProcessDto?>
{
    private readonly TerminalDbContext _dbContext;

    public GetProcessQueryHandler(TerminalDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<GetProcessDto?> Handle(GetProcessQuery request, CancellationToken ct)
    {
        var sample = await _dbContext.Processes
            .AsNoTracking()
            .Include(s => s.Projects)
            .Include(s => s.Recipe)
            .Include(s => s.Steps)
            .ThenInclude(s => s.Parameters)
            .ThenInclude(p => p.Parameter)
            .Include(s => s.Tags)
            .SingleOrDefaultAsync(s => s.Id.Equals(request.Id), ct);

        return sample?.AsGetSampleDto();
    }
}