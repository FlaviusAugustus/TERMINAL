using Terminal.Backend.Core.Entities;
using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Core.Abstractions.Repositories;

public interface ISampleRepository
{
    Task AddAsync(Process sample, CancellationToken ct);
    Task<Process?> GetAsync(ProcessId id, CancellationToken cancellationToken);
    Task DeleteAsync(Process sample, CancellationToken cancellationToken);
    Task UpdateAsync(Process sample, CancellationToken cancellationToken);
}