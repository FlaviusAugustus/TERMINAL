using System;
using System.Globalization;
using Terminal.Backend.Core.Exceptions;


public sealed record SequentialNumber
{
    public int Value { get; init; }
    private SequentialNumber() { }
    private SequentialNumber(int value)
    {
        Value = value;
    }


    public static SequentialNumber Create(string input)
    {
        if (!int.TryParse(input, NumberStyles.Integer, CultureInfo.InvariantCulture, out int numericValue))
        {
            throw new InvalidSequentialNumberException("Sequential number must contain only digits.");
        }

        if (numericValue < 0)
        {
            throw new InvalidSequentialNumberException("Sequential number cannot be negative.");
        }

        return new SequentialNumber(numericValue);
    }

    public static SequentialNumber Create(int value)
    {
        if (value < 0)
        {
            throw new InvalidSequentialNumberException("Sequential number cannot be negative.");
        }
        return new SequentialNumber(value);
    }

    public override string ToString()
    {
        return Value.ToString("D5");
    }

    public static implicit operator int(SequentialNumber number) => number.Value;
}