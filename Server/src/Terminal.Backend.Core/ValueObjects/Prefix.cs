using Terminal.Backend.Core.Exceptions;

namespace Terminal.Backend.Core.ValueObjects;

public sealed record Prefix
{
    public string Value { get; init; }
    private Prefix() { }
    private Prefix(string value)
    {
        Value = value;
    }

    public static Prefix Create(string input)
    {
        if (string.IsNullOrWhiteSpace(input))
        {
            throw new InvalidPrefixException("Prefix cannot be null or whitespace.", nameof(input));
        }

        string normalized = input.ToUpper();

        if (!normalized.EndsWith("X"))
        {
            throw new InvalidPrefixException("Prefix must end with 'X'.", nameof(input));
        }

        foreach (char c in normalized)
        {
            if (c < 'A' || c > 'Z')
            {
                throw new InvalidPrefixException("Prefix can only contain letters.", nameof(input));
            }
        }

        return new Prefix(normalized);
    }

    public static implicit operator string(Prefix prefix) => prefix.Value;

}