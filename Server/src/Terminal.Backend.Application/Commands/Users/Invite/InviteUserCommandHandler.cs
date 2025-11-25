using MediatR;
using Terminal.Backend.Application.Abstractions;
using Terminal.Backend.Core.Abstractions.Factories;
using Terminal.Backend.Core.Abstractions.Repositories;
using Terminal.Backend.Core.Entities;
using Terminal.Backend.Core.Exceptions;
using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Application.Commands.Users.Create;

internal sealed class InviteUserCommandHandler : IRequestHandler<InviteUserCommand, InvitationDto>
{
    private readonly IUserRepository _userRepository;
    private readonly IInvitationFactory _invitationFactory;
    private readonly IMailService _mailService;
    private readonly IRoleRepository _roleRepository;

    public InviteUserCommandHandler(IUserRepository userRepository, IInvitationFactory invitationFactory,
        IMailService mailService, IRoleRepository roleRepository)
    {
        _userRepository = userRepository;
        _invitationFactory = invitationFactory;
        _mailService = mailService;
        _roleRepository = roleRepository;
    }

    public async Task<InvitationDto> Handle(InviteUserCommand request, CancellationToken cancellationToken)
    {
        var (email, role) = request;
        var user = await _userRepository.GetUserByEmailAsync(email, cancellationToken);

        if (user is null)
        {
            user = User.CreateInactiveUser(UserId.Create(), email);
            var newUserRole = await _roleRepository.GetByNameAsync(role, cancellationToken)
                              ?? throw new RoleNotFoundException(role);
            user.SetRole(newUserRole);
            await _userRepository.AddUserAsync(user, cancellationToken);
        }

        if (user.Activated)
        {
            throw new UserAlreadyExistsException(email);
        }

        var invitation = await _invitationFactory.CrateAsync(user, cancellationToken);
        await _mailService.SendInvitation(invitation);

        return new InvitationDto(invitation.Link, invitation.ExpiresIn.ToString("d"));
    }
}

public class UserAlreadyExistsException : TerminalException
{
    public UserAlreadyExistsException(string email) : base("User already exists")
    {
    }
}