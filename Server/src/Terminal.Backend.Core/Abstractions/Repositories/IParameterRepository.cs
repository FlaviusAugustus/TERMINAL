using Terminal.Backend.Core.Entities.Parameters;
using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Core.Abstractions.Repositories;

public interface IParameterRepository
{
    Task<T?> GetAsync<T>(ParameterId id, CancellationToken ct) where T : Parameter;
    Task AddAsync(Parameter parameter, CancellationToken ct);
    Task UpdateAsync(Parameter parameter);
    Task<bool> IsNameUniqueAsync(ParameterName name, CancellationToken cancellationToken);
}