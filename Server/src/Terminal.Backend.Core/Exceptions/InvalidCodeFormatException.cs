using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Core.Exceptions;

public sealed class InvalidCodeFormatException : TerminalException
{
    public InvalidCodeFormatException(string message) : base(message) { }
}