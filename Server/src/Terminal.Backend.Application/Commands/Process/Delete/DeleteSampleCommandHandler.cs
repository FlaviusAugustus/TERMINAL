using MediatR;
using Terminal.Backend.Application.Exceptions;
using Terminal.Backend.Core.Abstractions.Repositories;

namespace Terminal.Backend.Application.Commands.Process.Delete;

internal sealed class DeleteSampleCommandHandler : IRequestHandler<DeleteProcessCommand>
{
    private readonly IProcessRepository _sampleRepository;

    public DeleteSampleCommandHandler(IProcessRepository sampleRepository)
    {
        _sampleRepository = sampleRepository;
    }

    public async Task Handle(DeleteProcessCommand request, CancellationToken cancellationToken)
    {
        var id = request.Id;
        var sample = await _sampleRepository.GetAsync(id, cancellationToken);
        if (sample is null)
        {
            throw new ProcessNotFoundException();
        }

        await _sampleRepository.DeleteAsync(sample, cancellationToken);
    }
}