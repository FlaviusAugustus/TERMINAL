using Terminal.Backend.Core.Entities;

namespace Terminal.Backend.Core.Abstractions.Repositories;

public interface IPrefixRepository
{
    Task<PrefixCounter?> GetAsync(string prefix, CancellationToken ct);
    Task DeleteAsync(PrefixCounter prefixCounter, CancellationToken cancellationToken);
}