using MediatR;
using Terminal.Backend.Application.DTO.Parameters;

namespace Terminal.Backend.Application.Queries.Parameters.Get;

public sealed class GetParametersQuery : IRequest<GetParametersDto>
{
    public bool OnlyActive { get; set; }

    public GetParametersQuery(bool onlyActive = true)
    {
        OnlyActive = onlyActive;
    }
}