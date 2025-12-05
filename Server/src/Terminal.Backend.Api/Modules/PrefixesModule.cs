using MediatR;
using Microsoft.AspNetCore.Mvc;
using Terminal.Backend.Api.Swagger;
using Terminal.Backend.Application.Commands.Project.Create;
using Terminal.Backend.Application.Queries.Prefixes.Get;
using Terminal.Backend.Core.Enums;
using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Api.Modules;

public static class PrefixesModule
{
    private const string ApiRouteBase = "api/prefixes";

    public static void UsePrefixEndpoints(this IEndpointRouteBuilder app)
    {

        app.MapGet(ApiRouteBase, async (
                    [FromQuery] int pageSize,
                    [FromQuery] int pageNumber,
                    [FromQuery] bool? desc,
                    ISender sender,
                    CancellationToken ct
                ) =>
                Results.Ok(await sender.Send(new GetPrefixesQuery(pageSize, pageNumber, desc ?? true), ct)))
            .RequireAuthorization(Permission.ProjectRead.ToString())
            .WithTags(SwaggerSetup.PrefixTag);

        app.MapPost(ApiRouteBase, async (
                CreateProjectCommand command,
                ISender sender,
                CancellationToken ct) =>
            {
                command = command with { Id = ProjectId.Create() };
                await sender.Send(command, ct);
                return Results.Created(ApiRouteBase, new { command.Id });
            }).RequireAuthorization(Permission.ProjectWrite.ToString())
            .WithTags(SwaggerSetup.PrefixTag);
        
        app.MapPatch(ApiRouteBase + "/{prefix:alpha}", async (
                String prefix,
                ISender sender,
                CancellationToken ct) =>
            {
                // var command = new ChangeProjectStatusCommand(id, false);
                // await sender.Send(command, ct);
                return Results.Ok();
            }).RequireAuthorization(Permission.ProjectUpdate.ToString())
            .WithTags(SwaggerSetup.PrefixTag);
        
        app.MapDelete(ApiRouteBase + "/{prefix:alpha}", async (
                Guid id,
                ISender sender,
                CancellationToken ct) =>
            {
                return Results.Ok();
            }).RequireAuthorization(Permission.ProjectDelete.ToString())
            .WithTags(SwaggerSetup.PrefixTag);
    }
}