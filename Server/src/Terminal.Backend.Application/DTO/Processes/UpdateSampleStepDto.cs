using Terminal.Backend.Application.DTO.ParameterValues;

namespace Terminal.Backend.Application.DTO.Processes;

public sealed record UpdateSampleStepDto(
    Guid Id,
    IEnumerable<CreateSampleBaseParameterValueDto> Parameters,
    string Comment);