namespace Terminal.Backend.Application.DTO.Tags;

public class GetSearchedTagsDto
{
  public IEnumerable<TagDto> Tags { get; set; }

  public int TotalAmount { get; set; }

  public sealed record TagDto(Guid Id, string Name, bool IsActive);

  public GetSearchedTagsDto(IEnumerable<TagDto> tags, int totalAmount)
  {
    Tags = tags;
    TotalAmount = totalAmount;
  }
}