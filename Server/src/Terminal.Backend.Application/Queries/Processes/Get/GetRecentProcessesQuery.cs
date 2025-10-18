using System.Reflection;
using MediatR;
using Microsoft.AspNetCore.Http;
using Terminal.Backend.Application.DTO.Processes;

namespace Terminal.Backend.Application.Queries.Processes.Get;

public sealed record GetRecentProcessesQuery(int Length) : IRequest<GetRecentProcessesDto>
{
    public static ValueTask<GetRecentProcessesQuery?> BindAsync(HttpContext context, ParameterInfo parameter)
    {
        const string numberKey = "len";
        var parsed = int.TryParse(context.Request.Query[numberKey], out var length);
        length = parsed ? length : 5;

        var result = new GetRecentProcessesQuery(length);

        return ValueTask.FromResult<GetRecentProcessesQuery?>(result);
    }
}