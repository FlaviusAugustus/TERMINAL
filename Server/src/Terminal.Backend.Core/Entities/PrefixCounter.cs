using Terminal.Backend.Core.Exceptions;
using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Core.Entities;

public class PrefixCounter
{
    public PrefixId Id { get; private set; }
    public string Prefix { get; private set; }

    public int LastValue { get; private set; }

    private PrefixCounter() { }

    public PrefixCounter(string prefix)
    {
        if (string.IsNullOrWhiteSpace(prefix))
        {
            throw new ArgumentException("Prefix cannot be empty", nameof(prefix));
        }

        Id = PrefixId.Create();
        Prefix = ValidatedPrefix(prefix);
        LastValue = 0; 
    }
    public int Increment()
    {
        LastValue++;
        return LastValue;
    }

    public void Decrement()
    {
        if (LastValue > 0)
        {
            LastValue--;
        }
    }
    
    public void Update(string prefix)
    {
        Prefix = ValidatedPrefix(prefix);
    }

    private string ValidatedPrefix(string prefix)
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
        return normalizedPrefix;
    }
}