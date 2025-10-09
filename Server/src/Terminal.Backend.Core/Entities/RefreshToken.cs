using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Core.Entities;

public sealed class RefreshToken
{
    public RefreshTokenId Id { get; set; }
    public string Token { get; set; }
    public UserId UserId { get; set; }
    public DateTime ExpiresOnUtc { get; set; }
    
    public User User { get; set; }
}