using Microsoft.EntityFrameworkCore;
using Terminal.Backend.Core.Abstractions.Repositories;
using Terminal.Backend.Core.Entities;
using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Infrastructure.DAL.Repositories;

internal class RefreshTokenRepository : IRefreshTokenRepository
{
    private readonly DbSet<RefreshToken> _refreshTokens;
    
    public RefreshTokenRepository(TerminalDbContext context)
    {
        _refreshTokens = context.RefreshTokens;
    }

    public async Task<RefreshToken?> GetAsync(UserId userId, CancellationToken ct)
        => await _refreshTokens.SingleOrDefaultAsync(r => r.UserId == userId, ct);
    
    public async Task<RefreshToken?> GetAsync(string token, CancellationToken ct)
        => await _refreshTokens.SingleOrDefaultAsync(r => r.Token == token, ct);
    
    public async Task<RefreshToken?> GetAsync(Guid userId, CancellationToken ct)
        => await _refreshTokens.SingleOrDefaultAsync(r => r.UserId.Value == userId, ct);
    
    public async Task AddAsync(RefreshToken refreshToken, CancellationToken ct)
        => await _refreshTokens.AddAsync(refreshToken, ct);
    
    public Task UpdateAsync(RefreshToken refreshToken, CancellationToken ct)
    {
        _refreshTokens.Update(refreshToken);
        return Task.CompletedTask;
    }

    public Task DeleteAsync(RefreshToken refreshToken, CancellationToken ct)
    {
        _refreshTokens.Remove(refreshToken);
        return Task.CompletedTask;
    }
}