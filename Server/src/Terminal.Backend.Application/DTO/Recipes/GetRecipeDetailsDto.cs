using Terminal.Backend.Application.DTO.Processes;

namespace Terminal.Backend.Application.DTO.Recipes;

public sealed record GetRecipeDetailsDto(Guid Id, string Name, IEnumerable<GetSampleStepsDto> Steps);