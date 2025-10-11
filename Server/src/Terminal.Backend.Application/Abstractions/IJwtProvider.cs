using Terminal.Backend.Application.Commands.Users.Login;
using Terminal.Backend.Core.Entities;

namespace Terminal.Backend.Application.Abstractions;

public interface IJwtProvider
{
    string GenerateJwt(User user);
    string GenerateRefreshToken();
    RefreshToken CreateRefreshTokenEntity(Guid userId, string hashedRefreshToken);
}