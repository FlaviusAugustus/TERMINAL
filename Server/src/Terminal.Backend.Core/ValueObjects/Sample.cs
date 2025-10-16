using Terminal.Backend.Core.Exceptions;

namespace Terminal.Backend.Core.ValueObjects;

public sealed record Sample
{
    private const string Prefix = "AX"; // TODO: move to configuration file
    public string Value => $"{Prefix}{Number}";
    public ulong Number { get; }

    public Sample(ulong number)
    {
        Number = number;
    }

    public Sample(string code)
    {
        var isParsable = ulong.TryParse(code.AsSpan(Prefix.Length), out var number);
        var isValid = !string.IsNullOrWhiteSpace(code) &&
                      code.StartsWith(Prefix) &&
                      isParsable;

        if (!isValid)
        {
            throw new InvalidSampleCodeException(code);
        }

        Number = number;
    }

    public static implicit operator string(Sample code) => code.Value;
    public static implicit operator Sample(string code) => new(code);
}