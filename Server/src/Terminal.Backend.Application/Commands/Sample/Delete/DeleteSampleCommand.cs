using MediatR;
using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Application.Commands.Sample.Delete;

public sealed record DeleteSampleCommand(ProcessId Id) : IRequest;