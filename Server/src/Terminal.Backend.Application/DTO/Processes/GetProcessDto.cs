using Terminal.Backend.Application.DTO.Codes;
using Terminal.Backend.Application.DTO.Projects;
using Terminal.Backend.Application.DTO.Recipes;
using Terminal.Backend.Application.DTO.Tags;

namespace Terminal.Backend.Application.DTO.Processes;

public class GetProcessDto
{
    public Guid Id { get; set; }
    public Code Code { get; set; }
    public GetRecipeDto? Recipe { get; set; }
    public string CreatedAtUtc { get; set; }
    public string? Comment { get; set; }
    public IEnumerable<ProjectDto> Projects { get; set; }
    public IEnumerable<GetSampleStepsDto> Steps { get; set; }
    public IEnumerable<GetTagsDto.TagDto> Tags { get; set; }
}