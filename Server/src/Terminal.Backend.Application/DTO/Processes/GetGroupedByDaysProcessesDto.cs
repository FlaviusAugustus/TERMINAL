namespace Terminal.Backend.Application.DTO.Processes;

public class GetGroupedByDaysProcessesDto
{
    public List<GroupedAmount> GroupedByDaysProcesses = [];
    
    public sealed record GroupedAmount(string Date, int Amount);
}