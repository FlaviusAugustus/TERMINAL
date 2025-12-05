using Terminal.Backend.Core.Entities;

namespace Terminal.Backend.Application.DTO.Codes;

public class GetPrefixesDto
{
    public IEnumerable<PrefixDto> Prefixes { get; set; }

    public sealed record PrefixDto(string Prefix);
}