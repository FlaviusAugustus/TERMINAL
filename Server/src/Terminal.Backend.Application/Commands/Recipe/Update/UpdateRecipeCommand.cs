using System.Text.Json.Serialization;
using MediatR;
using Terminal.Backend.Application.DTO.Processes;
using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Application.Commands.Recipe.Update;

public sealed record UpdateRecipeCommand(
    [property: JsonIgnore] RecipeId Id, 
    string Name,
    IEnumerable<UpdateSampleStepDto> Steps) : IRequest;