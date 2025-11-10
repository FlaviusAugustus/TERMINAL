using System;
using System.Linq;
using System.Globalization;
using Terminal.Backend.Core.Exceptions;

public sealed record Code
{
    public string Prefix { get; init; }
    public int SequentialNumber { get; init; }

    private Code() { }

    private Code(string prefix, int number)
    {
        Prefix = prefix;
        SequentialNumber = number;
    }

    public static Code Create(string prefix, int number)
    {
        if (string.IsNullOrWhiteSpace(prefix))
        {
            throw new InvalidCodeFormatException("Prefix cannot be null or whitespace.");
        }

        string normalizedPrefix = prefix.ToUpper();

        if (!normalizedPrefix.EndsWith("X"))
        {
            throw new InvalidCodeFormatException("Prefix must end with 'X'.");
        }

        foreach (char c in normalizedPrefix)
        {
            if (c < 'A' || c > 'Z')
            {
                throw new InvalidCodeFormatException("Prefix can only contain letters.");
            }
        }

        if (number < 0)
        {
            throw new InvalidCodeFormatException("Sequential number cannot be negative.");
        }

        return new Code(normalizedPrefix, number);
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

        if (!int.TryParse(numberPart, NumberStyles.Integer, CultureInfo.InvariantCulture, out int numericValue))
        {
            throw new InvalidCodeFormatException("Sequential number part must contain only digits.");
        }

        return Create(prefixPart, numericValue);
    }

    public override string ToString()
    {
        return $"{Prefix}{SequentialNumber:D5}";
    }
}