namespace Terminal.Backend.Application.DTO.Processes;

public class GetProcessesDto
{
    public IEnumerable<ProcessDto> Processes { get; set; }

    public sealed record ProcessDto(Guid Id, string Code, IEnumerable<string> Projects, string CreatedAtUtc, string Comment);
}