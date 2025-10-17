using Terminal.Backend.Application.Commands.Users.Login;
using Terminal.Backend.Core.Entities;

namespace Terminal.Backend.Application.Abstractions;

public interface IJwtProvider
{
    JwtToken Generate(User user);
}