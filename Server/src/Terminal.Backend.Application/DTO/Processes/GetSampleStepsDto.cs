using Terminal.Backend.Application.DTO.ParameterValues;

namespace Terminal.Backend.Application.DTO.Processes;

public sealed record GetSampleStepsDto(
    Guid Id,
    IEnumerable<GetSampleBaseParameterValueDto> Parameters,
    string Comment);