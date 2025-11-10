using Microsoft.EntityFrameworkCore;
using Terminal.Backend.Core.Abstractions.Repositories;
using Terminal.Backend.Core.Entities;
using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Infrastructure.DAL.Repositories;

internal sealed class ProcessRepository : IProcessRepository
{
    private readonly DbSet<Process> _processes;

    public ProcessRepository(TerminalDbContext dbContext)
    {
        _processes = dbContext.Processes;
    }

    public async Task AddAsync(Process sample, CancellationToken ct)
        => await _processes.AddAsync(sample, ct);

    public Task<Process?> GetAsync(ProcessId id, CancellationToken cancellationToken)
        => _processes
            .Include(s => s.Projects)
            .Include(s => s.Recipe)
            .Include(s => s.Steps)
            .ThenInclude(s => s.Parameters)
            .ThenInclude(p => p.Parameter)
            .Include(s => s.Tags)
            .SingleOrDefaultAsync(s => s.Id == id, cancellationToken);

    public Task DeleteAsync(Process sample, CancellationToken cancellationToken)
    {
        _processes.Remove(sample);
        return Task.CompletedTask;
    }

    public Task UpdateAsync(Process sample, CancellationToken cancellationToken)
    {
        _processes.Update(sample);
        return Task.CompletedTask;
    }
}