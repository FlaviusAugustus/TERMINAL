using MediatR;

namespace Terminal.Backend.Application.Commands.Prefix.Create;

public sealed record CreatePrefixCommand(string prefix) : IRequest;
