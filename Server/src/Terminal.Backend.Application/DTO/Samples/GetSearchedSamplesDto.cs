namespace Terminal.Backend.Application.DTO.Samples;

public class GetSearchedSamplesDto
{
  public IEnumerable<SampleDto> Samples { get; set; }

  public int TotalAmount { get; set; }

  public sealed record SampleDto(Guid Id, string Code, string Project, string CreatedAtUtc, string Comment);

  public GetSearchedSamplesDto(IEnumerable<SampleDto> samples, int totalAmount)
  {
    Samples = samples;
    TotalAmount = totalAmount;
  }
}