using System;
using System.Linq;
using Terminal.Backend.Core.Exceptions;
using Terminal.Backend.Core.ValueObjects;

public sealed record Code
{
    public Prefix Prefix { get; init; }
    public SequentialNumber Number { get; init; }
    private Code() { }
    private Code(Prefix prefix, SequentialNumber number)
    {
        Prefix = prefix;
        Number = number;
    }

    public static Code Create(Prefix prefix, SequentialNumber number)
    {
        return new Code(prefix, number);
    }

    public static Code Create(string fullCode)
    {
        if (string.IsNullOrWhiteSpace(fullCode))
        {
            throw new InvalidCodeFormatException("Code cannot be empty.");
        }

        int firstDigitIndex = fullCode.ToCharArray().ToList().FindIndex(char.IsDigit);

        if (firstDigitIndex == -1 || firstDigitIndex == 0)
        {
            throw new InvalidCodeFormatException("Code must have a valid prefix and a numeric part.");
        }

        string prefixPart = fullCode.Substring(0, firstDigitIndex);
        string numberPart = fullCode.Substring(firstDigitIndex);

        var prefix = Prefix.Create(prefixPart);
        var number = SequentialNumber.Create(numberPart);

        return Create(prefix, number);
    }

    public override string ToString()
    {
        return $"{Prefix}{Number}";
    }
}