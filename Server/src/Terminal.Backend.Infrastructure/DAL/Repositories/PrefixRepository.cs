using Microsoft.EntityFrameworkCore;
using Terminal.Backend.Core.Abstractions.Repositories;
using Terminal.Backend.Core.Entities;

namespace Terminal.Backend.Infrastructure.DAL.Repositories;

internal class PrefixRepository: IPrefixRepository
{
    private readonly DbSet<PrefixCounter> _prefixes;

    public PrefixRepository(TerminalDbContext context)
    {
        _prefixes = context.PrefixCounters;
    }
    
    public Task<PrefixCounter?> GetAsync(string prefix, CancellationToken ct)
        => _prefixes.SingleOrDefaultAsync(p => p.Prefix == prefix, ct);
    
    public async Task AddAsync(PrefixCounter prefixCounter, CancellationToken ct)
        => await _prefixes.AddAsync(prefixCounter, ct);
    
    public Task UpdateAsync(PrefixCounter prefixCounter, CancellationToken ct)
    {
        _prefixes.Update(prefixCounter);
        return Task.CompletedTask;
    }
    
    public Task DeleteAsync(PrefixCounter prefixCounter, CancellationToken cancellationToken)
    {
        _prefixes.Remove(prefixCounter);
        return Task.CompletedTask;
    }

    public Task<bool> IsPrefixUniqueAsync(string prefix, CancellationToken cancellationToken) 
        => _prefixes.AllAsync(p => !p.Prefix.Equals(prefix), cancellationToken);

}