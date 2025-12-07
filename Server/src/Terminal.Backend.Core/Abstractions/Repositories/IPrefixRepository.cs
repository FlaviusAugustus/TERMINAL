using Terminal.Backend.Core.Entities;

namespace Terminal.Backend.Core.Abstractions.Repositories;

public interface IPrefixRepository
{
    Task<PrefixCounter?> GetAsync(string prefix, CancellationToken ct);
    Task AddAsync(PrefixCounter prefixCounter, CancellationToken ct);
    Task UpdateAsync(PrefixCounter prefixCounter, CancellationToken ct);
    Task DeleteAsync(PrefixCounter prefixCounter, CancellationToken cancellationToken);
    Task<bool> IsPrefixUniqueAsync(string prefix, CancellationToken cancellationToken);
}