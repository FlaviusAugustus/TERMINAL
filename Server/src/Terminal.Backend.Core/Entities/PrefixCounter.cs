using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Core.Entities;

public class PrefixCounter
{
    public string Prefix { get; private set; }

    public int LastValue { get; private set; }

    private PrefixCounter() { }

    public PrefixCounter(string prefix)
    {
        if (string.IsNullOrWhiteSpace(prefix))
        {
            throw new ArgumentException("Prefix nie może być pusty.", nameof(prefix));
        }
        Prefix = prefix;
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
}