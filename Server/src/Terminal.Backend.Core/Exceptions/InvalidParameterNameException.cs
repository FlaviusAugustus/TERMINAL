namespace Terminal.Backend.Core.Exceptions;

public sealed class InvalidParameterNameException : TerminalException
{
    public InvalidParameterNameException(string name) : base($"Unable to create parameter name with name {name}!")
    {
    }
}