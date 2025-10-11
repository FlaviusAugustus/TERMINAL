using MediatR;

namespace Terminal.Backend.Application.Commands.Users.Refresh;

public sealed record DeleteRefreshTokenCommand(Guid userId) : IRequest;