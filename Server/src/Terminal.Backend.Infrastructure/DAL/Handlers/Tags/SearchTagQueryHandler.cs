using MediatR;
using Microsoft.EntityFrameworkCore;
using Terminal.Backend.Application.DTO.Tags;
using Terminal.Backend.Application.Queries.Tags.Search;
using Terminal.Backend.Core.Entities;

namespace Terminal.Backend.Infrastructure.DAL.Handlers.Tags;

internal sealed class SearchTagQueryHandler : IRequestHandler<SearchTagQuery, GetSearchedTagsDto>
{
    private readonly DbSet<Tag> _tags;

    public SearchTagQueryHandler(TerminalDbContext dbContext)
    {
        _tags = dbContext.Tags;
    }

    public async Task<GetSearchedTagsDto> Handle(SearchTagQuery request, CancellationToken cancellationToken)
    {
        var query = _tags
                    .AsNoTracking()
                    .Where(p => EF.Functions.ILike(p.Name, $"%{request.SearchPhrase}%"));

        var amount = await query.CountAsync(cancellationToken);

        var tags = await query
            .Select(p => new GetSearchedTagsDto.TagDto(p.Id, p.Name, p.IsActive))
            .ToListAsync(cancellationToken);

        return new GetSearchedTagsDto(tags, amount);
    }
}