using Terminal.Backend.Application.DTO.ParameterValues;

namespace Terminal.Backend.Application.DTO.Processes;

public sealed record CreateSampleStepDto(
    IEnumerable<CreateSampleBaseParameterValueDto> Parameters,
    string Comment);