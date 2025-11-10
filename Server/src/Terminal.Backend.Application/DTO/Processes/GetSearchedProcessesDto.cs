namespace Terminal.Backend.Application.DTO.Processes;

public class GetSearchedProcessesDto
{
    public IEnumerable<ProcessDto> Processes { get; set; }
    public int TotalAmount { get; set; }

    public sealed record ProcessDto(Guid Id, Code Code, IEnumerable<string> Projects, string CreatedAtUtc, string Comment);

    public GetSearchedProcessesDto(IEnumerable<ProcessDto> samples, int totalAmount)
  {
    Processes = samples;
    TotalAmount = totalAmount;
  }
}