using Microsoft.EntityFrameworkCore;
using Terminal.Backend.Core.Abstractions.Repositories;
using Terminal.Backend.Core.Entities.Parameters;
using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Infrastructure.DAL.Repositories;

internal sealed class ParameterRepository : IParameterRepository
{
    private readonly DbSet<Parameter> _parameters;

    public ParameterRepository(TerminalDbContext dbContext)
    {
        _parameters = dbContext.Parameters;
    }

    public async Task<T?> GetAsync<T>(ParameterId id, CancellationToken ct)
        where T : Parameter
        => await _parameters
            .Include(p => p.Parent)
            .SingleOrDefaultAsync(p => p.Id == id, ct) as T;

    public async Task AddAsync(Parameter parameter, CancellationToken ct)
        => await _parameters.AddAsync(parameter, ct);

    public Task UpdateAsync(Parameter parameter)
    {
        _parameters.Update(parameter);
        return Task.CompletedTask;
    }
    
    public Task<bool> IsNameUniqueAsync(ParameterName name, CancellationToken cancellationToken) 
        => _parameters.AllAsync(p => !p.Name.Equals(name), cancellationToken);
}