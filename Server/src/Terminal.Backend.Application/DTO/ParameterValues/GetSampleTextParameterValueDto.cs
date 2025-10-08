namespace Terminal.Backend.Application.DTO.ParameterValues;

public sealed record GetSampleTextParameterValueDto(Guid Id, string Name, string Value, List<string> AllowedValues)
    : GetSampleBaseParameterValueDto(Id, Name);