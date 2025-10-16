using MediatR;
using Microsoft.EntityFrameworkCore;
using Terminal.Backend.Application.DTO.Samples;
using Terminal.Backend.Application.Queries.Samples.Search;
using Terminal.Backend.Core.Entities;

namespace Terminal.Backend.Infrastructure.DAL.Handlers.Samples;

internal sealed class SearchSampleQueryHandler : IRequestHandler<SearchSampleQuery, GetSearchedSamplesDto>
{
    private readonly DbSet<Process> _samples;

    public SearchSampleQueryHandler(TerminalDbContext dbContext)
    {
        _samples = dbContext.Samples;
    }

    public async Task<GetSearchedSamplesDto> Handle(SearchSampleQuery request, CancellationToken ct)
    {
        var query = _samples
            .AsNoTracking()
            .Include(m => m.Project)
            .Include(m => m.Recipe)
            .Where(m =>
                EF.Functions.ToTsVector("english", "AX" + m.Code + " " + m.Comment)
                    .Matches(EF.Functions.PhraseToTsQuery($"{request.SearchPhrase}:*")) ||
                EF.Functions.ILike(m.Project.Name, $"%{request.SearchPhrase}%") ||
                EF.Functions.ILike(m.Recipe.RecipeName, $"%{request.SearchPhrase}%"));

        var amount = await query.CountAsync(ct);

        var samples = await query
            .Select(m => new GetSearchedSamplesDto.SampleDto(
                m.Id,
                m.Code.Value,
                m.Project.Name,
                m.CreatedAtUtc.ToString("o"),
                m.Comment))
            .Paginate(request.Parameters)
            .ToListAsync(ct);

        return new GetSearchedSamplesDto(samples, amount);
    }
}