using System.Text.Json.Serialization;
using MediatR;

namespace Terminal.Backend.Application.Commands.Prefix.Update;

public sealed record UpdatePrefixCommand([property: JsonIgnore] string OldPrefix, string NewPrefix): IRequest;