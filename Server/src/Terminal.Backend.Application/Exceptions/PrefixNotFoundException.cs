using Terminal.Backend.Core.Exceptions;

namespace Terminal.Backend.Application.Exceptions;

public class PrefixNotFoundException: TerminalException
{
    public PrefixNotFoundException() : base("Prefix not found!")
    {
    }
}