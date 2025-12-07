using MediatR;

namespace Terminal.Backend.Application.Commands.Prefix.Delete;

public sealed record DeletePrefixCommand (string prefix) : IRequest;