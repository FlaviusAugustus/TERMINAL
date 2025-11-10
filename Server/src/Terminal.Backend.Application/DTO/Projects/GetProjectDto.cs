namespace Terminal.Backend.Application.DTO.Projects;

public class ProjectDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public bool IsActive { get; set; }
    public IEnumerable<Guid> SamplesIds { get; set; }
}