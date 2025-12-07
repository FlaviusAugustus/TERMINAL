using MediatR;
using Terminal.Backend.Application.Exceptions;
using Terminal.Backend.Core.Abstractions.Repositories;
using Terminal.Backend.Core.Entities;

namespace Terminal.Backend.Application.Commands.Prefix.Delete;

internal class DeletePrefixCommandHandler : IRequestHandler<DeletePrefixCommand>
{
    private readonly IPrefixRepository _repository;

    public DeletePrefixCommandHandler(IPrefixRepository repository)
    {
        _repository = repository;
    }

    public async Task Handle(DeletePrefixCommand request, CancellationToken cancellationToken)
    {
        var prefix = request.prefix;
        var prefixCounter = await _repository.GetAsync(prefix, cancellationToken);
        if (prefixCounter is null)
        {
            throw new PrefixNotFoundException();
        }

        if (prefixCounter.LastValue > 0)
        {
            throw new PrefixNotAbleToDelete();
        }

        await _repository.DeleteAsync(prefixCounter, cancellationToken);
    }
}