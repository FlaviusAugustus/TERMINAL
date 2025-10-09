using Terminal.Backend.Core.Entities;
using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Core.Abstractions.Repositories;

public interface IRefreshTokenRepository
{
    Task<RefreshToken?> GetAsync(UserId userId, CancellationToken ct);
    Task AddAsync(RefreshToken refreshToken, CancellationToken ct);
    Task DeleteAsync(RefreshToken refreshToken, CancellationToken ct);


}