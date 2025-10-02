namespace Terminal.Backend.Application.DTO.Projects;

public class GetSearchedProjectsDto
{
  public IEnumerable<ProjectDto> Projects { get; set; }

  public int TotalAmount { get; set; }

  public sealed record ProjectDto(Guid Id, string Name, bool IsActive);

  public GetSearchedProjectsDto(IEnumerable<ProjectDto> projects, int totalAmount)
  {
    Projects = projects;
    TotalAmount = totalAmount;
  }
}