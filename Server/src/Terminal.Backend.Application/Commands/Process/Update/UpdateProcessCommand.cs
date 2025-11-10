using System.Text.Json.Serialization;
using MediatR;
using Terminal.Backend.Application.DTO.Processes;
using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Application.Commands.Process.Update;

public sealed record UpdateProcessCommand(
    [property: JsonIgnore] ProcessId Id,
    IEnumerable<Guid> Projects,
    Guid? RecipeId,
    IEnumerable<UpdateSampleStepDto> Steps,
    IEnumerable<Guid> TagIds,
    string Comment) : IRequest;