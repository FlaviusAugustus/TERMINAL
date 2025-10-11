using MediatR;
using Terminal.Backend.Core.Abstractions.Repositories;

namespace Terminal.Backend.Application.Commands.Users.Refresh;

public sealed class DeleteRefreshTokenHandler : IRequestHandler<DeleteRefreshTokenCommand>
{
    private readonly IRefreshTokenRepository _refreshTokenRepository;

    public DeleteRefreshTokenHandler(IRefreshTokenRepository refreshTokenRepository)
    {
        _refreshTokenRepository = refreshTokenRepository;
    }

    public async Task Handle(DeleteRefreshTokenCommand deleteRefreshTokenCommand, CancellationToken ct)
    {
        var refreshToken = await _refreshTokenRepository.GetAsync(deleteRefreshTokenCommand.userId, ct);

        if (refreshToken != null)
        {
            await _refreshTokenRepository.DeleteAsync(refreshToken, ct);
        }
    }
    
}