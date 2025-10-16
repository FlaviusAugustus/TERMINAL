using MediatR;
using Microsoft.AspNetCore.Mvc;
using Terminal.Backend.Api.Swagger;
using Terminal.Backend.Application.Commands.Sample.Create;
using Terminal.Backend.Application.Commands.Sample.Delete;
using Terminal.Backend.Application.Commands.Sample.Update;
using Terminal.Backend.Application.DTO.ParameterValues;
using Terminal.Backend.Application.DTO.Samples;
using Terminal.Backend.Application.Queries.Samples.Get;
using Terminal.Backend.Application.Queries.Samples.Search;
using Terminal.Backend.Core.Enums;
using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Api.Modules;

public static class SamplesModule
{
    private const string ApiRouteBase = "api/samples";

    public static void UseSamplesEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost(ApiRouteBase, async (
                CreateSampleCommand command,
                ISender sender,
                CancellationToken ct) =>
            {
                var id = ProcessId.Create();
                command = command with { SampleId = id };
                await sender.Send(command, ct);
                return Results.Created(ApiRouteBase, new { id });
            }).RequireAuthorization(Permission.SampleWrite.ToString())
            .WithTags(SwaggerSetup.SampleTag);

        app.MapGet(ApiRouteBase + "/example", () =>
            {
                var sample = new CreateSampleCommand(ProcessId.Create(), ProjectId.Create(), null, new[]
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

                return Results.Ok(sample);
            }).AllowAnonymous()
            .WithTags(SwaggerSetup.SampleTag);

        app.MapGet(ApiRouteBase + "/recent", async (
                [FromQuery] int length,
                ISender sender,
                CancellationToken ct) =>
            {
                if (length <= 0)
                {
                    return Results.BadRequest();
                }

                var recentSamples = await sender.Send(new GetRecentSamplesQuery(length), ct);
                return Results.Ok(recentSamples);
            }).RequireAuthorization(Permission.SampleRead.ToString())
            .WithTags(SwaggerSetup.SampleTag);

        app.MapGet(ApiRouteBase + "/{id:guid}", async (Guid id, ISender sender, CancellationToken ct) =>
            {
                var query = new GetSampleQuery { Id = id };
                var sample = await sender.Send(query, ct);
                return sample is null ? Results.NotFound() : Results.Ok(sample);
            }).RequireAuthorization(Permission.SampleRead.ToString())
            .WithTags(SwaggerSetup.SampleTag);

        app.MapGet(ApiRouteBase, async (
                [FromQuery] int pageNumber,
                [FromQuery] int pageSize,
                [FromQuery] string? orderBy,
                [FromQuery] bool? desc,
                ISender sender,
                CancellationToken ct) =>
            {
                var query = new GetSamplesQuery(pageNumber, pageSize, orderBy ?? "CreatedAtUtc", desc ?? true);
                var samples = await sender.Send(query, ct);
                return Results.Ok(samples);
            }).RequireAuthorization(Permission.SampleRead.ToString())
            .WithTags(SwaggerSetup.SampleTag);

        app.MapGet(ApiRouteBase + "/amount", async (
                ISender sender,
                CancellationToken ct) =>
            {
                var query = new GetSamplesAmountQuery();
                var amount = await sender.Send(query, ct);
                return Results.Ok(amount);
            }).RequireAuthorization(Permission.SampleRead.ToString())
            .WithTags(SwaggerSetup.SampleTag);

        app.MapGet(ApiRouteBase + "/search", async (
                [FromQuery] string searchPhrase,
                [FromQuery] int pageNumber,
                [FromQuery] int pageSize,
                ISender sender,
                CancellationToken ct) =>
            {
                var query = new SearchSampleQuery(searchPhrase, pageNumber, pageSize);
                var samples = await sender.Send(query, ct);
                return Results.Ok(samples);
            }).RequireAuthorization(Permission.SampleRead.ToString())
            .WithTags(SwaggerSetup.SampleTag);

        app.MapDelete(ApiRouteBase + "/{id:guid}", async (
                Guid id,
                ISender sender,
                CancellationToken ct) =>
            {
                await sender.Send(new DeleteSampleCommand(id), ct);
                return Results.Ok();
            }).RequireAuthorization(Permission.SampleDelete.ToString())
            .WithTags(SwaggerSetup.SampleTag);

        app.MapPatch(ApiRouteBase + "/{id:guid}", async (
                Guid id,
                ISender sender,
                UpdateSampleCommand command,
                CancellationToken ct) =>
            {
                command = command with { Id = id };
                await sender.Send(command, ct);
                return Results.Ok();
            }).RequireAuthorization(Permission.SampleUpdate.ToString())
            .WithTags(SwaggerSetup.SampleTag);
    }
}