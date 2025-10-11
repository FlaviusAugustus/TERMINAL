using Terminal.Backend.Core.Exceptions;

namespace Terminal.Backend.Core.ValueObjects;

public sealed record  RefreshTokenId
{
    public Guid Value { get; }

    public RefreshTokenId(Guid id)
    {
        if (id == Guid.Empty)
        {
            throw new InvalidEntityIdException(id);
        }

        Value = id;
    }

    public static RefreshTokenId Create() => new(Guid.NewGuid());

    public static implicit operator Guid(RefreshTokenId id) => id.Value;
    public static implicit operator RefreshTokenId(Guid id) => new(id);
}