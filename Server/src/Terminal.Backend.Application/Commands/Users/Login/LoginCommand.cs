using MediatR;

namespace Terminal.Backend.Application.Commands.Users.Login;

public sealed record LoginCommand(string Email, string Password) : IRequest<JwtToken>;

public sealed record JwtToken(string Token);