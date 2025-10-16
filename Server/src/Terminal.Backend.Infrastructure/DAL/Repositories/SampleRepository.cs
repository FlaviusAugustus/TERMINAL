using Microsoft.EntityFrameworkCore;
using Terminal.Backend.Core.Abstractions.Repositories;
using Terminal.Backend.Core.Entities;
using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Infrastructure.DAL.Repositories;

internal sealed class SampleRepository : ISampleRepository
{
    private readonly DbSet<Process> _samples;

    public SampleRepository(TerminalDbContext dbContext)
    {
        _samples = dbContext.Samples;
    }

    public async Task AddAsync(Process sample, CancellationToken ct)
        => await _samples.AddAsync(sample, ct);

    public Task<Process?> GetAsync(ProcessId id, CancellationToken cancellationToken)
        => _samples
            .Include(s => s.Project)
            .Include(s => s.Recipe)
            .Include(s => s.Steps)
            .ThenInclude(s => s.Parameters)
            .ThenInclude(p => p.Parameter)
            .Include(s => s.Tags)
            .SingleOrDefaultAsync(s => s.Id == id, cancellationToken);

    public Task DeleteAsync(Process sample, CancellationToken cancellationToken)
    {
        _samples.Remove(sample);
        return Task.CompletedTask;
    }

    public Task UpdateAsync(Process sample, CancellationToken cancellationToken)
    {
        _samples.Update(sample);
        return Task.CompletedTask;
    }
}