using MediatR;
using Microsoft.EntityFrameworkCore;
using Terminal.Backend.Application.DTO.Processes;
using Terminal.Backend.Application.Queries.Processes.Search;
using Terminal.Backend.Core.Entities;

namespace Terminal.Backend.Infrastructure.DAL.Handlers.Processes;

internal sealed class SearchProcessQueryHandler : IRequestHandler<SearchProcessQuery, GetSearchedProcessesDto>
{
    private readonly DbSet<Process> _samples;

    public SearchProcessQueryHandler(TerminalDbContext dbContext)
    {
        _samples = dbContext.Processes;
    }

    public async Task<GetSearchedProcessesDto> Handle(SearchProcessQuery request, CancellationToken ct)
    {
        var query = _samples
            .AsNoTracking()
            .Include(m => m.Projects)
            .Include(m => m.Recipe)
            .Where(m =>
                EF.Functions.ToTsVector("english", m.Code.ToString() + " " + m.Comment)
                    .Matches(EF.Functions.PhraseToTsQuery($"{request.SearchPhrase}:*")) ||
                m.Projects.Any(p => EF.Functions.ILike(p.Name, $"%{request.SearchPhrase}%")) ||
                EF.Functions.ILike(m.Recipe.RecipeName, $"%{request.SearchPhrase}%"));

        var amount = await query.CountAsync(ct);

        var samples = await query
            .Select(m => new GetSearchedProcessesDto.ProcessDto(
                m.Id,
                m.Code,
                m.Projects.Select(p => p.Name),
                m.CreatedAtUtc.ToString("o"),
                m.Comment))
            .Paginate(request.Parameters)
            .ToListAsync(ct);

        return new GetSearchedProcessesDto(samples, amount);
    }
}