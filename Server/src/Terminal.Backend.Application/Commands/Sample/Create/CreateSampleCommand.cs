using System.Text.Json.Serialization;
using MediatR;
using Terminal.Backend.Application.DTO.Samples;
using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Application.Commands.Sample.Create;

public sealed record CreateSampleCommand(
    [property: JsonIgnore] ProcessId SampleId,
    Guid ProjectId,
    Guid? RecipeId,
    IEnumerable<CreateSampleStepDto> Steps,
    IEnumerable<Guid> TagIds,
    string Comment,
    bool SaveAsRecipe,
    string? RecipeName = null) : IRequest;