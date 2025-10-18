using Terminal.Backend.Core.Exceptions;

namespace Terminal.Backend.Application.Exceptions;

public class ProcessNotFoundException : TerminalException
{
    public ProcessNotFoundException() : base("Sample not found!")
    {
    }
}