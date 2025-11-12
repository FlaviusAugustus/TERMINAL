using MediatR;
using Terminal.Backend.Core.Abstractions.Repositories;
using Terminal.Backend.Core.Exceptions;

namespace Terminal.Backend.Application.Commands.Project.Create;

internal sealed class CreateProjectCommandHandler : IRequestHandler<CreateProjectCommand>
{
    private readonly IProjectRepository _projectRepository;

    public CreateProjectCommandHandler(IProjectRepository projectRepository)
    {
        _projectRepository = projectRepository;
    }

    public async Task Handle(CreateProjectCommand request, CancellationToken ct)
    {
        if (!await _projectRepository.IsNameUniqueAsync(request.Name, ct))
        {
            throw new InvalidProjectNameException(request.Name);
        }
        var newProject = new Core.Entities.Project(request.Id, request.Name);
        await _projectRepository.AddAsync(newProject, ct);
    }
}