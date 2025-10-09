using MediatR;
using Terminal.Backend.Application.Abstractions;
using Terminal.Backend.Application.Commands.Users.Login;
using Terminal.Backend.Application.Exceptions;
using Terminal.Backend.Core.Abstractions.Repositories;

namespace Terminal.Backend.Application.Commands.Users.Refresh;

internal sealed class RefreshTokenCommandHandler : IRequestHandler<RefreshTokenCommand, AuthenticatedResponse>
{
    private readonly IJwtProvider _jwtProvider;
    private readonly IUserRepository _userRepository;

    public RefreshTokenCommandHandler(IJwtProvider jwtProvider, IUserRepository userRepository)
    {
        _jwtProvider = jwtProvider;
        _userRepository = userRepository;
    }

    public async Task<AuthenticatedResponse> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
    {
        var id = request.Id;
        var user = await _userRepository.GetAsync(id, cancellationToken);
        if (user is null)
        {
            throw new UserNotFoundException();
        }

        var token = _jwtProvider.GenerateJwt(user);
        return new AuthenticatedResponse(token, "TEST");
    }
}