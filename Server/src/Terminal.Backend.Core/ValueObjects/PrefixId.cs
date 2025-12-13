using Terminal.Backend.Core.Exceptions;

namespace Terminal.Backend.Core.ValueObjects;

public sealed record PrefixId
{
    public Guid Value { get; }

    public PrefixId(Guid id)
    {
        if (id == Guid.Empty)
        {
            throw new InvalidEntityIdException(id);
        }

        Value = id;
    }

    private PrefixId()
    {
    }

    public static PrefixId Create() => new(Guid.NewGuid());

    public static implicit operator Guid(PrefixId id) => id.Value;
    public static implicit operator PrefixId(Guid id) => new(id);
}