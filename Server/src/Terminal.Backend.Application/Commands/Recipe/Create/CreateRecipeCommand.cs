using System.Text.Json.Serialization;
using MediatR;
using Terminal.Backend.Application.DTO.Processes;
using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Application.Commands.Recipe.Create;

public sealed record CreateRecipeCommand(
    [property: JsonIgnore] RecipeId Id,
    string Name,
    IEnumerable<CreateSampleStepDto> Steps) : IRequest;