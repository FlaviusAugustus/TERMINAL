using MediatR;
using Terminal.Backend.Application.Abstractions;
using Terminal.Backend.Application.Exceptions;
using Terminal.Backend.Core.Abstractions.Repositories;

namespace Terminal.Backend.Application.Commands.Users.Login;

internal sealed class LoginCommandHandler : IRequestHandler<LoginCommand, JwtToken>
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IJwtProvider _jwtProvider;

    public LoginCommandHandler(IUserRepository userRepository, IPasswordHasher passwordHasher, IJwtProvider jwtProvider)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
        _jwtProvider = jwtProvider;
    }

    public async Task<JwtToken> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var (email, password) = request;

        var user = await _userRepository.GetUserByEmailAsync(email, cancellationToken);
        if (user is null)
        {
            throw new UserNotFoundException();
        }

        if (!user.Activated)
        {
            throw new AccountNotActivatedException();
        }

        if (!_passwordHasher.Verify(password, user.Password))
        {
            throw new InvalidCredentialsException();
        }

        return _jwtProvider.Generate(user);
    }
}