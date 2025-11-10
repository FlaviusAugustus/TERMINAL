namespace Terminal.Backend.Core.Exceptions;

public sealed class InvalidSequentialNumberException : TerminalException
{
    public InvalidSequentialNumberException(string message) : base(message) { }
}