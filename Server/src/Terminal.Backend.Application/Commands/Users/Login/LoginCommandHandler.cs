using MediatR;
using Terminal.Backend.Application.Abstractions;
using Terminal.Backend.Application.Exceptions;
using Terminal.Backend.Core.Abstractions.Repositories;
using Terminal.Backend.Core.Entities;

namespace Terminal.Backend.Application.Commands.Users.Login;

internal sealed class LoginCommandHandler : IRequestHandler<LoginCommand, AuthenticatedResponse>
{
    private readonly IUserRepository _userRepository;
    private readonly IRefreshTokenRepository _refreshTokenRepository;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IJwtProvider _jwtProvider;

    public LoginCommandHandler(
        IUserRepository userRepository, 
        IRefreshTokenRepository refreshTokenRepository, 
        IPasswordHasher passwordHasher, 
        IJwtProvider jwtProvider)
    {
        _userRepository = userRepository;
        _refreshTokenRepository = refreshTokenRepository;
        _passwordHasher = passwordHasher;
        _jwtProvider = jwtProvider;
    }

    public async Task<AuthenticatedResponse> Handle(LoginCommand request, CancellationToken cancellationToken)
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
 
        var accessToken = _jwtProvider.GenerateJwt(user);
        var refreshToken = _jwtProvider.GenerateRefreshToken();

        var refreshTokenEntity = new RefreshToken
        {
            Id = Guid.NewGuid(),
            UserId = user.Id,
            Token = Extensions.Hash(refreshToken),
            ExpiresOnUtc = DateTime.UtcNow.AddDays(360),
            IsValid = true,
        };
        
        var existingToken = await _refreshTokenRepository.GetAsync(user.Id, cancellationToken);
        
        if (existingToken != null)
        {
            await _refreshTokenRepository.DeleteAsync(existingToken, cancellationToken);
        }

        await _refreshTokenRepository.AddAsync(refreshTokenEntity, cancellationToken);
        
        return new AuthenticatedResponse(accessToken, refreshToken);
    }
}