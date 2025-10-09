using MediatR;
using Terminal.Backend.Application.Commands.Users.Login;

namespace Terminal.Backend.Application.Commands.Users.Refresh;

public sealed record RefreshTokenCommand(string RefreshToken) : IRequest<AuthenticatedResponse>;