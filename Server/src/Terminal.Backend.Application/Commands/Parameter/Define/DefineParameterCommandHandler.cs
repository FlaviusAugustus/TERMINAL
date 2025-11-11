using MediatR;
using Terminal.Backend.Core.Abstractions.Repositories;
using Terminal.Backend.Core.Exceptions;

namespace Terminal.Backend.Application.Commands.Parameter.Define;

internal sealed class DefineParameterCommandHandler : IRequestHandler<DefineParameterCommand>
{
    private readonly IParameterRepository _parameterRepository;

    public DefineParameterCommandHandler(IParameterRepository parameterRepository)
    {
        _parameterRepository = parameterRepository;
    }

    public async Task Handle(DefineParameterCommand command, CancellationToken ct)
    {
        var parameter = command.Parameter;

        if (!await _parameterRepository.IsNameUniqueAsync(parameter.Name, ct))
        {
            throw new InvalidParameterNameException(parameter.Name);
        }

        await _parameterRepository.AddAsync(parameter, ct);
    }
}