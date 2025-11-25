using MediatR;
using Terminal.Backend.Application.Abstractions;
using Terminal.Backend.Core.Abstractions.Factories;
using Terminal.Backend.Core.Abstractions.Repositories;
using Terminal.Backend.Core.Entities;
using Terminal.Backend.Core.Exceptions;
using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Application.Commands.Users.Create;

internal sealed class CreateUserCommandHandler : IRequestHandler<CreateUserCommand>
{
    private readonly IUserRepository _userRepository;
    private readonly IRoleRepository _roleRepository;
    private readonly IPasswordHasher _passwordHasher;

    public CreateUserCommandHandler(
        IUserRepository userRepository,
        IRoleRepository roleRepository, 
        IPasswordHasher passwordHasher)
    {
        _userRepository = userRepository;
        _roleRepository = roleRepository;
        _passwordHasher = passwordHasher;
    }

    public async Task Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        var (email, password,  role) = request;
        var user = await _userRepository.GetUserByEmailAsync(email, cancellationToken);

        if (user is null)
        {
            user = User.CreateActiveUser(UserId.Create(), email, _passwordHasher.Hash(password));
            var newUserRole = await _roleRepository.GetByNameAsync(role, cancellationToken)
                              ?? throw new RoleNotFoundException(role);
            user.SetRole(newUserRole);
            await _userRepository.AddUserAsync(user, cancellationToken);
        }
    }
}