using System.Text.Json.Serialization;
using MediatR;
using Terminal.Backend.Application.DTO.Processes;
using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Application.Commands.Process.Create;

public sealed record CreateProcessCommand(
    [property: JsonIgnore] ProcessId ProcessId,
    Prefix Prefix,
    IEnumerable<Guid> Projects,
    Guid? RecipeId,
    IEnumerable<CreateSampleStepDto> Steps,
    IEnumerable<Guid> TagIds,
    string Comment,
    bool SaveAsRecipe,
    string? RecipeName = null) : IRequest;