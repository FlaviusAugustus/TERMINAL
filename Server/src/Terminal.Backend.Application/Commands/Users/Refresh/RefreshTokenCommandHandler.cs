using MediatR;
using Terminal.Backend.Application.Abstractions;
using Terminal.Backend.Application.Commands.Users.Login;
using Terminal.Backend.Application.Exceptions;
using Terminal.Backend.Core.Abstractions.Repositories;
using Terminal.Backend.Core.Exceptions;
using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Application.Commands.Users.Refresh;

internal sealed class RefreshTokenCommandHandler : IRequestHandler<RefreshTokenCommand, AuthenticatedResponse>
{
    private readonly IJwtProvider _jwtProvider;
    private readonly IUserRepository _userRepository;
    private readonly IRefreshTokenRepository _refreshTokenRepository;

    public RefreshTokenCommandHandler(
        IJwtProvider jwtProvider, 
        IUserRepository userRepository, 
        IRefreshTokenRepository refreshTokenRepository)
    {
        _jwtProvider = jwtProvider;
        _userRepository = userRepository;
        _refreshTokenRepository = refreshTokenRepository;
    }

    public async Task<AuthenticatedResponse> Handle(RefreshTokenCommand command, CancellationToken cancellationToken)
    {
        var refreshTokenEntity = await _refreshTokenRepository.GetAsync(Extensions.Hash(command.RefreshToken), cancellationToken);
        if (refreshTokenEntity is null || 
            !refreshTokenEntity.IsValid || 
            refreshTokenEntity.ExpiresOnUtc < DateTime.UtcNow)
        {
            throw new InvalidRefreshToken();
        }
        
        var user = await _userRepository.GetAsync(refreshTokenEntity.UserId, cancellationToken);
        if (user is null)
        {
            throw new InvalidRefreshToken();
        }

        var newAccessToken = _jwtProvider.GenerateJwt(user);
        var newRefreshToken = _jwtProvider.GenerateRefreshToken();

        refreshTokenEntity.Token = Extensions.Hash(newRefreshToken);
        await _refreshTokenRepository.UpdateAsync(refreshTokenEntity, cancellationToken);
        
        return new AuthenticatedResponse(newAccessToken, newRefreshToken);
    }
}