using MediatR;
using Microsoft.EntityFrameworkCore;
using Terminal.Backend.Application.DTO.Codes;
using Terminal.Backend.Application.Queries.Prefixes.Get;
using Terminal.Backend.Core.Entities;

namespace Terminal.Backend.Infrastructure.DAL.Handlers.Prefixes;

internal class GetPrefixesQueryHandler: IRequestHandler<GetPrefixesQuery, GetPrefixesDto>
{
    private readonly DbSet<PrefixCounter> _prefixes;

    public GetPrefixesQueryHandler(TerminalDbContext dbContext)
    {
        _prefixes = dbContext.PrefixCounters;
    }
    
    public async Task<GetPrefixesDto> Handle(GetPrefixesQuery request, CancellationToken ct)
    => (await _prefixes
            .AsNoTracking()
            .OrderBy(request.OrderingParameters)
            .Paginate(request.Parameters)
            .ToListAsync(ct)).AsPrefixesDto();
}