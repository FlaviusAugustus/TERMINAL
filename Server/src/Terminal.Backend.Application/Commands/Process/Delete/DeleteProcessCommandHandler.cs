using MediatR;
using Terminal.Backend.Application.Exceptions;
using Terminal.Backend.Core.Abstractions.Repositories;

namespace Terminal.Backend.Application.Commands.Process.Delete;

internal sealed class DeleteProcessCommandHandler : IRequestHandler<DeleteProcessCommand>
{
    private readonly IProcessRepository _processRepository;

    public DeleteProcessCommandHandler(IProcessRepository processRepository)
    {
        _processRepository = processRepository;
    }

    public async Task Handle(DeleteProcessCommand request, CancellationToken cancellationToken)
    {
        var id = request.Id;
        var sample = await _processRepository.GetAsync(id, cancellationToken);
        if (sample is null)
        {
            throw new ProcessNotFoundException();
        }

        await _processRepository.DeleteAsync(sample, cancellationToken);
    }
}