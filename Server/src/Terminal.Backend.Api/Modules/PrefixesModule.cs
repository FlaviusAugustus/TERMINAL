using MediatR;
using Microsoft.AspNetCore.Mvc;
using Terminal.Backend.Api.Swagger;
using Terminal.Backend.Application.Commands.Prefix.Create;
using Terminal.Backend.Application.Commands.Prefix.Delete;
using Terminal.Backend.Application.Commands.Prefix.Update;
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
        
        app.MapGet(ApiRouteBase + "/amount", async (
                    ISender sender,
                    CancellationToken ct
                ) =>
                Results.Ok(await sender.Send(new GetPrefixesAmountQuery(), ct)))
            .RequireAuthorization(Permission.ProjectRead.ToString())
            .WithTags(SwaggerSetup.PrefixTag);

        app.MapPost(ApiRouteBase, async (
                CreatePrefixCommand command,
                ISender sender,
                CancellationToken ct) =>
            {
                await sender.Send(command, ct);
                return Results.Created(ApiRouteBase, new { command.prefix });
            }).RequireAuthorization(Permission.ProjectWrite.ToString())
            .WithTags(SwaggerSetup.PrefixTag);
        
        app.MapPatch(ApiRouteBase + "/{prefix:alpha}", async (
                String prefix,
                [FromBody] UpdatePrefixCommand command,
                ISender sender,
                CancellationToken ct) =>
            {
                command = command with { OldPrefix = prefix };
                await sender.Send(command, ct);
                return Results.Ok();
            }).RequireAuthorization(Permission.ProjectUpdate.ToString())
            .WithTags(SwaggerSetup.PrefixTag);
        
        app.MapDelete(ApiRouteBase + "/{prefix:alpha}", async (
                string prefix,
                ISender sender,
                CancellationToken ct) =>
            {
                var command = new DeletePrefixCommand(prefix);
                await sender.Send(command, ct);
                return Results.Ok();
            }).RequireAuthorization(Permission.ProjectRead.ToString())
            .WithTags(SwaggerSetup.PrefixTag);
    }
}