using System.Text.Json.Serialization;
using MediatR;
using Terminal.Backend.Application.DTO.Samples;
using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Application.Commands.Sample.Update;

public sealed record UpdateSampleCommand(
    [property: JsonIgnore] ProcessId Id,
    Guid ProjectId,
    Guid? RecipeId,
    IEnumerable<UpdateSampleStepDto> Steps,
    IEnumerable<Guid> TagIds,
    string Comment) : IRequest;