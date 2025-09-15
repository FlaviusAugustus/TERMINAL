using MediatR;
using Microsoft.EntityFrameworkCore;
using Terminal.Backend.Application.DTO.Projects;
using Terminal.Backend.Application.Queries.Projects.Search;
using Terminal.Backend.Core.Entities;

namespace Terminal.Backend.Infrastructure.DAL.Handlers.Projects;

internal sealed class SearchProjectQueryHandler : IRequestHandler<SearchProjectQuery, GetSearchedProjectsDto>
{
    private readonly DbSet<Project> _projects;

    public SearchProjectQueryHandler(TerminalDbContext dbContext)
    {
        _projects = dbContext.Projects;
    }

    public async Task<GetSearchedProjectsDto> Handle(SearchProjectQuery request, CancellationToken cancellationToken)
    {
        var query = _projects
                    .AsNoTracking()
                    .Where(p => EF.Functions.ILike(p.Name, $"%{request.SearchPhrase}%"));

        var amount = await query.CountAsync(cancellationToken);

        var projects = await query
            .Select(p => new GetSearchedProjectsDto.ProjectDto(p.Id, p.Name, p.IsActive))
            .Paginate(request.Parameters)
            .ToListAsync(cancellationToken);

        return new GetSearchedProjectsDto(projects, amount);
    }
}