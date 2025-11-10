using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Application.Abstractions;

public interface ICodeGeneratorService
{
    Task<Code> GenerateNextCodeAsync(string prefix, CancellationToken ct = default);
}