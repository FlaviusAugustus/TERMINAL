namespace Terminal.Backend.Application.DTO.Processes;

public class GetGroupedByDaysProcessesDto
{
    public Dictionary<string, long> GroupedByDaysProcesses = new Dictionary<string, long>();
    
    public sealed record ProcessDto(Guid Id, Code Code, IEnumerable<string> Projects, string Comment);
}