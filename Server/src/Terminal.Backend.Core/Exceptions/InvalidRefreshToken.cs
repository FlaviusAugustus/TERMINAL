namespace Terminal.Backend.Core.Exceptions;

public sealed class InvalidRefreshToken : TerminalException
{
    public InvalidRefreshToken() : base($"Invalid refresh token!")
    {
    }
}