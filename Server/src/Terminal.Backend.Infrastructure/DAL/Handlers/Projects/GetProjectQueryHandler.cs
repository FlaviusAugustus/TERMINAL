using MediatR;
using Microsoft.EntityFrameworkCore;
using Terminal.Backend.Application.DTO.Projects;
using Terminal.Backend.Application.Queries.Projects.Get;
using Terminal.Backend.Core.Entities;

namespace Terminal.Backend.Infrastructure.DAL.Handlers.Projects;

internal sealed class GetProjectQueryHandler : IRequestHandler<GetProjectQuery, ProjectDto?>
{
    private readonly DbSet<Project> _projects;

    public GetProjectQueryHandler(TerminalDbContext dbContext)
    {
        _projects = dbContext.Projects;
    }

    public async Task<ProjectDto?> Handle(GetProjectQuery query, CancellationToken ct)
    {
        var projectId = query.ProjectId;
        var project = (await _projects
            .AsNoTracking()
            // FIXME: .Include(p => p.Samples)
            .SingleOrDefaultAsync(p => p.Id.Equals(projectId), ct))?.AsGetProjectDto();

        if (project is null) return project;

        var sampleIds = await _projects
            .AsNoTracking()
            .Where(p => p.Id.Equals(projectId))
            .SelectMany(p => p.Processes)
            .Select(m => m.Id.Value)
            .ToListAsync(ct);

        project.SamplesIds = sampleIds;

        return project;
    }
}