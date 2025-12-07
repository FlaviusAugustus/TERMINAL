using Terminal.Backend.Core.Exceptions;

namespace Terminal.Backend.Application.Exceptions;

public class PrefixNotAbleToDelete: TerminalException
{
    public PrefixNotAbleToDelete() : base("Prefix is not able to delete!")
    {
    }
}
