using Terminal.Backend.Core.Exceptions;

namespace Terminal.Backend.Core.ValueObjects;

public sealed record ProcessId
{
    public Guid Value { get; }

    public ProcessId(Guid id)
    {
        if (id == Guid.Empty)
        {
            throw new InvalidEntityIdException(id);
        }

        Value = id;
    }

    public static ProcessId Create() => new(Guid.NewGuid());

    public static implicit operator Guid(ProcessId id) => id.Value;
    public static implicit operator ProcessId(Guid id) => new(id);
}