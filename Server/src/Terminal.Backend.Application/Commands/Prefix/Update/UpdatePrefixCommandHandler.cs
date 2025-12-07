using MediatR;
using Terminal.Backend.Application.Abstractions;
using Terminal.Backend.Application.Exceptions;
using Terminal.Backend.Core.Abstractions.Repositories;
using Terminal.Backend.Core.Entities;
using Terminal.Backend.Core.Exceptions;

namespace Terminal.Backend.Application.Commands.Prefix.Update;

public class UpdatePrefixCommandHandler :IRequestHandler<UpdatePrefixCommand>
{

    private readonly IPrefixRepository _repository;
    private readonly ICodeGeneratorService _generatorCode;

    public UpdatePrefixCommandHandler(IPrefixRepository repository, ICodeGeneratorService generatorCode)
    {
        _repository = repository;
        _generatorCode = generatorCode;
    }

    public async Task Handle(UpdatePrefixCommand request, CancellationToken cancellationToken)
    {
        var prefixCounter = await _repository.GetAsync(request.OldPrefix, cancellationToken);

        if (prefixCounter is null)
        {
            throw new PrefixNotFoundException();
        }

        if (request.OldPrefix == request.NewPrefix)
        {
            return;
        }

        if (!await _repository.IsPrefixUniqueAsync(request.NewPrefix, cancellationToken))
        {
            throw new InvalidPrefixException("Prefix already exists: ",request.NewPrefix);
        }

        prefixCounter.Update(request.NewPrefix);
        await _repository.UpdateAsync(prefixCounter, cancellationToken);
    }
}