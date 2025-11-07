using MediatR;

namespace Terminal.Backend.Application.Commands.Users.Login;

public sealed record LoginCommand(string Email, string Password) : IRequest<AuthenticatedResponse>;

public sealed record AuthenticatedResponse(string Token, string RefreshToken );