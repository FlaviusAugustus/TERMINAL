using MediatR;
using Terminal.Backend.Application.Abstractions;
using Terminal.Backend.Core.Abstractions.Repositories;
using Terminal.Backend.Core.Entities;
using Terminal.Backend.Core.Exceptions;

namespace Terminal.Backend.Application.Commands.Prefix.Create;

public class CreatePrefixCommandHandler :IRequestHandler<CreatePrefixCommand>
{

    private readonly IPrefixRepository _repository;
    private readonly ICodeGeneratorService _generatorCode;

    public CreatePrefixCommandHandler(IPrefixRepository repository, ICodeGeneratorService generatorCode)
    {
        _repository = repository;
        _generatorCode = generatorCode;
    }

    public async Task Handle(CreatePrefixCommand request, CancellationToken cancellationToken)
    {
        if (!await _repository.IsPrefixUniqueAsync(request.prefix, cancellationToken))
        {
            throw new InvalidPrefixException("Prefix already exists: ",request.prefix);
        }

        var newPrefix = new PrefixCounter(request.prefix);
        await _repository.AddAsync(newPrefix, cancellationToken);
    }
}