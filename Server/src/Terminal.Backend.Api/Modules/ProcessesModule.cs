using MediatR;
using Microsoft.AspNetCore.Mvc;
using Terminal.Backend.Api.Swagger;
using Terminal.Backend.Application.Commands.Process.Create;
using Terminal.Backend.Application.Commands.Process.Delete;
using Terminal.Backend.Application.Commands.Process.Update;
using Terminal.Backend.Application.DTO.ParameterValues;
using Terminal.Backend.Application.DTO.Processes;
using Terminal.Backend.Application.Queries.Processes.Get;
using Terminal.Backend.Application.Queries.Processes.Search;
using Terminal.Backend.Core.Enums;
using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Api.Modules;

public static class ProcessesModule
{
    private const string ApiRouteBase = "api/process";

    public static void UseProcessesEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost(ApiRouteBase, async (
                CreateProcessCommand command,
                ISender sender,
                CancellationToken ct) =>
            {
                var id = ProcessId.Create();
                command = command with { ProcessId = id };
                await sender.Send(command, ct);
                return Results.Created(ApiRouteBase, new { id });
            }).RequireAuthorization(Permission.ProcessWrite.ToString())
            .WithTags(SwaggerSetup.ProcessTag);

        app.MapGet(ApiRouteBase + "/example", () =>
            {
                var process = new CreateProcessCommand(ProcessId.Create(),
                    new List<Guid>
                    {
                        ProjectId.Create(), ProjectId.Create(), ProjectId.Create()
                    },
                    null,
                    new[]
                    {
                        new CreateSampleStepDto(new CreateSampleBaseParameterValueDto[]
                            {
                                new CreateSampleDecimalParameterValueDto(ParameterId.Create(), 0.111m),
                                new CreateSampleIntegerParameterValueDto(ParameterId.Create(), 2137),
                                new CreateSampleTextParameterValueDto(ParameterId.Create(), "text")
                            },
                            "comment")
                    },
                    new List<Guid>
                    {
                        TagId.Create(), TagId.Create(), TagId.Create()
                    },
                    "comment", false);

                return Results.Ok(process);
            }).AllowAnonymous()
            .WithTags(SwaggerSetup.ProcessTag);

        app.MapGet(ApiRouteBase + "/recent", async (
                [FromQuery] int length,
                ISender sender,
                CancellationToken ct) =>
            {
                if (length <= 0)
                {
                    return Results.BadRequest();
                }

                var recentProcesses = await sender.Send(new GetRecentProcessesQuery(length), ct);
                return Results.Ok(recentProcesses);
            }).RequireAuthorization(Permission.ProcessRead.ToString())
            .WithTags(SwaggerSetup.ProcessTag);

        app.MapGet(ApiRouteBase + "/{id:guid}", async (Guid id, ISender sender, CancellationToken ct) =>
            {
                var query = new GetProcessQuery { Id = id };
                var process = await sender.Send(query, ct);
                return process is null ? Results.NotFound() : Results.Ok(process);
            }).RequireAuthorization(Permission.ProcessRead.ToString())
            .WithTags(SwaggerSetup.ProcessTag);

        app.MapGet(ApiRouteBase, async (
                [FromQuery] int pageNumber,
                [FromQuery] int pageSize,
                [FromQuery] string? orderBy,
                [FromQuery] bool? desc,
                ISender sender,
                CancellationToken ct) =>
            {
                var query = new GetProcessesQuery(pageNumber, pageSize, orderBy ?? "CreatedAtUtc", desc ?? true);
                var processes = await sender.Send(query, ct);
                return Results.Ok(processes);
            }).RequireAuthorization(Permission.ProcessRead.ToString())
            .WithTags(SwaggerSetup.ProcessTag);

        app.MapGet(ApiRouteBase + "/amount", async (
                ISender sender,
                CancellationToken ct) =>
            {
                var query = new GetProcessesAmountQuery();
                var amount = await sender.Send(query, ct);
                return Results.Ok(amount);
            }).RequireAuthorization(Permission.ProcessRead.ToString())
            .WithTags(SwaggerSetup.ProcessTag);

        app.MapGet(ApiRouteBase + "/search", async (
                [FromQuery] string searchPhrase,
                [FromQuery] int pageNumber,
                [FromQuery] int pageSize,
                ISender sender,
                CancellationToken ct) =>
            {
                var query = new SearchProcessQuery(searchPhrase, pageNumber, pageSize);
                var processes = await sender.Send(query, ct);
                return Results.Ok(processes);
            }).RequireAuthorization(Permission.ProcessRead.ToString())
            .WithTags(SwaggerSetup.ProcessTag);

        app.MapDelete(ApiRouteBase + "/{id:guid}", async (
                Guid id,
                ISender sender,
                CancellationToken ct) =>
            {
                await sender.Send(new DeleteProcessCommand(id), ct);
                return Results.Ok();
            }).RequireAuthorization(Permission.ProcessDelete.ToString())
            .WithTags(SwaggerSetup.ProcessTag);

        app.MapPatch(ApiRouteBase + "/{id:guid}", async (
                Guid id,
                ISender sender,
                UpdateProcessCommand command,
                CancellationToken ct) =>
            {
                command = command with { Id = id };
                await sender.Send(command, ct);
                return Results.Ok();
            }).RequireAuthorization(Permission.ProcessUpdate.ToString())
            .WithTags(SwaggerSetup.ProcessTag);
    }
}