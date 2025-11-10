using Terminal.Backend.Application.DTO.Processes;
using Terminal.Backend.Core.Entities;
using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Application.Abstractions;

internal interface IConvertDtoService
{
    Task<IEnumerable<SampleStep>> ConvertAsync(IEnumerable<CreateSampleStepDto> stepsDto, CancellationToken ct);
    Task<IEnumerable<SampleStep>> ConvertAsync(IEnumerable<UpdateSampleStepDto> stepsDto, CancellationToken ct);
    Task<IEnumerable<Tag>> ConvertAsync(IEnumerable<TagId> tagIds, CancellationToken ct);
    Task<IEnumerable<Project>> ConvertAsync(IEnumerable<ProjectId> projectIds, CancellationToken ct);
}