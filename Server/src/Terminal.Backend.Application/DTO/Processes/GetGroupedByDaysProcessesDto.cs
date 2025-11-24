namespace Terminal.Backend.Application.DTO.Processes;

public class GetGroupedByDaysProcessesDto
{
    public Dictionary<string, List<ProcessDto>> GroupedByDaysProcesses = new Dictionary<string, List<ProcessDto>>();
    
    public sealed record ProcessDto(Guid Id, Code Code, IEnumerable<string> Projects, string Comment);
}