namespace Terminal.Backend.Application.DTO.Processes;

public class GetRecentProcessesDto
{
    public IEnumerable<GetProcessesDto.ProcessDto> RecentSamples { get; set; } =
        Enumerable.Empty<GetProcessesDto.ProcessDto>();
}