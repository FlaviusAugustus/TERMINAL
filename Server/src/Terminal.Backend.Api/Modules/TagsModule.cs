using MediatR;
using Microsoft.AspNetCore.Mvc;
using Terminal.Backend.Api.Swagger;
using Terminal.Backend.Application.Commands.Tag.ChangeStatus;
using Terminal.Backend.Application.Commands.Tag.Create;
using Terminal.Backend.Application.Commands.Tag.Delete;
using Terminal.Backend.Application.Commands.Tag.Update;
using Terminal.Backend.Application.Queries.Tags.Get;
using Terminal.Backend.Application.Queries.Tags.Search;
using Terminal.Backend.Core.Enums;
using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Api.Modules;

public static class TagsModule
{
    private const string ApiBaseRoute = "api/tags";

    public static void UseTagEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet(ApiBaseRoute, (
                    [FromQuery] int pageNumber,
                    [FromQuery] int pageSize,
                    [FromQuery] bool? desc,
                    ISender sender,
                    CancellationToken ct) =>
                sender.Send(new GetTagsQuery(pageNumber, pageSize, desc ?? true), ct))
            .RequireAuthorization(Permission.TagRead.ToString())
            .WithTags(SwaggerSetup.TagTag);

        app.MapGet(ApiBaseRoute + "/all", (
                    [FromQuery] int pageNumber,
                    [FromQuery] int pageSize,
                    [FromQuery] bool? desc,
                    ISender sender,
                    CancellationToken ct) =>
                sender.Send(new GetTagsQuery(pageNumber, pageSize, desc ?? true, false), ct))
            .RequireAuthorization(Permission.TagRead.ToString())
            .WithTags(SwaggerSetup.TagTag);

        app.MapPost(ApiBaseRoute, async (
                CreateTagCommand command,
                ISender sender,
                CancellationToken ct) =>
            {
                command = command with { Id = TagId.Create() };
                await sender.Send(command, ct);
                return Results.Created(ApiBaseRoute, new { Id = command.Id.Value });
            }).RequireAuthorization(Permission.TagWrite.ToString())
            .WithTags(SwaggerSetup.TagTag);

        app.MapPost(ApiBaseRoute + "/{id:guid}/activate", async (
                Guid id,
                ISender sender,
                CancellationToken ct) =>
            {
                var command = new ChangeTagStatusCommand(id, true);
                await sender.Send(command, ct);
                return Results.Ok();
            }).RequireAuthorization(Permission.TagUpdate.ToString())
            .WithTags(SwaggerSetup.TagTag);

        app.MapPost(ApiBaseRoute + "/{id:guid}/deactivate", async (
                Guid id,
                ISender sender,
                CancellationToken ct) =>
            {
                var command = new ChangeTagStatusCommand(id, false);
                await sender.Send(command, ct);
                return Results.Ok();
            }).RequireAuthorization(Permission.TagUpdate.ToString())
            .WithTags(SwaggerSetup.TagTag);

        app.MapGet(ApiBaseRoute + "/search", async ([FromQuery] string searchPhrase, [FromQuery] int pageNumber,
        [FromQuery] int pageSize, ISender sender, CancellationToken ct) =>
            {
                var query = new SearchTagQuery(searchPhrase, pageNumber, pageSize);
                var tags = await sender.Send(query, ct);
                return Results.Ok(tags);
            }).RequireAuthorization(Permission.TagRead.ToString())
            .WithTags(SwaggerSetup.TagTag);

        app.MapGet(ApiBaseRoute + "/{id:guid}", async (
                Guid id,
                ISender sender,
                CancellationToken ct) =>
            {
                var tag = await sender.Send(new GetTagQuery { TagId = id }, ct);
                return tag is null ? Results.NotFound() : Results.Ok(tag);
            }).RequireAuthorization(Permission.TagRead.ToString())
            .WithTags(SwaggerSetup.TagTag);

        app.MapGet(ApiBaseRoute + "/amount", async (
                ISender sender,
                CancellationToken ct) =>
            {
                var query = new GetTagsAmountQuery();
                var amount = await sender.Send(query, ct);
                return Results.Ok(amount);
            }).RequireAuthorization(Permission.TagRead.ToString())
            .WithTags(SwaggerSetup.TagTag);

        app.MapDelete(ApiBaseRoute + "/{id:guid}", async (
                Guid id,
                ISender sender,
                CancellationToken ct) =>
            {
                var command = new DeleteTagCommand(id);
                await sender.Send(command, ct);
                return Results.Ok();
            }).RequireAuthorization(Permission.TagDelete.ToString())
            .WithTags(SwaggerSetup.TagTag);

        app.MapPatch(ApiBaseRoute + "/{id:guid}", async (
                Guid id,
                [FromBody] UpdateTagCommand command,
                ISender sender,
                CancellationToken ct) =>
            {
                command = command with { Id = id };
                await sender.Send(command, ct);
                return Results.Ok();
            }).RequireAuthorization(Permission.TagDelete.ToString())
            .WithTags(SwaggerSetup.TagTag);
    }
}