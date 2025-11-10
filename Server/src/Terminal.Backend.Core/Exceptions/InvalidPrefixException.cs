namespace Terminal.Backend.Core.Exceptions;

public sealed class InvalidPrefixException : TerminalException
{
    public InvalidPrefixException(string description, string name) : base($"{name}!")
    {
    }
}