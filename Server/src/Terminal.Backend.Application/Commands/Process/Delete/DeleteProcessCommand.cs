using MediatR;
using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Application.Commands.Process.Delete;

public sealed record DeleteProcessCommand(ProcessId Id) : IRequest;