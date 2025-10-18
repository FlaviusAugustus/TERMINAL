namespace Terminal.Backend.Application.DTO.Processes;

public class GetSearchedProcessesDto
{
    public IEnumerable<ProcessDto> Samples { get; set; }
    public int TotalAmount { get; set; }

    public sealed record ProcessDto(Guid Id, string Code, IEnumerable<string> Projects, string CreatedAtUtc, string Comment);

    public GetSearchedProcessesDto(IEnumerable<ProcessDto> samples, int totalAmount)
  {
    Samples = samples;
    TotalAmount = totalAmount;
  }
}