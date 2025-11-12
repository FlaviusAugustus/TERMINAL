using MediatR;
using Terminal.Backend.Core.Abstractions.Repositories;
using Terminal.Backend.Core.Exceptions;

namespace Terminal.Backend.Application.Commands.Tag.Create;

internal sealed class CreateTagCommandHandler : IRequestHandler<CreateTagCommand>
{
    private readonly ITagRepository _tagRepository;

    public CreateTagCommandHandler(ITagRepository tagRepository)
    {
        _tagRepository = tagRepository;
    }

    public async Task Handle(CreateTagCommand command, CancellationToken ct)
    {
        if (!await _tagRepository.IsNameUniqueAsync(command.Name, ct))
        {
            throw new InvalidTagException(command.Name);
        }
        var newTag = new Core.Entities.Tag(command.Id, command.Name);
        await _tagRepository.AddAsync(newTag, ct);
    }
}