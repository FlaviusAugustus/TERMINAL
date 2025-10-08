using MediatR;
using Terminal.Backend.Api.Swagger;
using Terminal.Backend.Application.Commands.Parameter.ChangeStatus;
using Terminal.Backend.Application.Commands.Parameter.Define;
using Terminal.Backend.Application.DTO.Parameters;
using Terminal.Backend.Application.Queries.Parameters.Get;
using Terminal.Backend.Core.Enums;
using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Api.Modules;

public static class ParametersModule
{
    private const string ApiBaseRoute = "api/parameters";

    public static void UseParametersEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet(ApiBaseRoute, async (ISender sender, CancellationToken ct) =>
            {
                var parameters = await sender.Send(new GetParametersQuery(), ct);
                return Results.Ok(parameters);
            }).RequireAuthorization(Permission.ParameterRead.ToString())
            .WithTags(SwaggerSetup.ParameterTag);

        app.MapPost(ApiBaseRoute + "/define/text", async (
                CreateTextParameterDto parameterDto,
                ISender sender,
                CancellationToken ct) =>
            {
                parameterDto = parameterDto with { Id = ParameterId.Create() };
                await sender.Send(new DefineParameterCommand(parameterDto.AsParameter()), ct);
                return Results.Created(ApiBaseRoute, new { parameterDto.Id });
            }).RequireAuthorization(Permission.ParameterWrite.ToString())
            .WithTags(SwaggerSetup.ParameterTag);

        app.MapPost(ApiBaseRoute + "/define/decimal", async (
                CreateDecimalParameterDto parameterDto,
                ISender sender,
                CancellationToken ct) =>
            {
                parameterDto = parameterDto with { Id = ParameterId.Create() };
                await sender.Send(new DefineParameterCommand(parameterDto.AsParameter()), ct);
                return Results.Created(ApiBaseRoute, new { parameterDto.Id });
            }).RequireAuthorization(Permission.ParameterWrite.ToString())
            .WithTags(SwaggerSetup.ParameterTag);

        app.MapPost(ApiBaseRoute + "/define/integer", async (
                CreateIntegerParameterDto parameterDto,
                ISender sender,
                CancellationToken ct) =>
            {
                parameterDto = parameterDto with { Id = ParameterId.Create() };
                await sender.Send(new DefineParameterCommand(parameterDto.AsParameter()), ct);
                return Results.Created(ApiBaseRoute, new { parameterDto.Id });
            }).RequireAuthorization(Permission.ParameterWrite.ToString())
            .WithTags(SwaggerSetup.ParameterTag);

        app.MapGet(ApiBaseRoute + "/{id:guid}", async (
                Guid id,
                ISender sender,
                CancellationToken ct) =>
            {
                var parameter = await sender.Send(new GetParameterQuery { Id = id }, ct);
                return parameter is null ? Results.NotFound() : Results.Ok(parameter);
            }).RequireAuthorization(Permission.ParameterRead.ToString())
            .WithTags(SwaggerSetup.ParameterTag);

        app.MapPost(ApiBaseRoute + "/{id:guid}/activate", async (
                Guid id,
                ISender sender,
                CancellationToken ct) =>
            {
                var command = new ChangeParameterStatusCommand(id, true);
                await sender.Send(command, ct);
                return Results.Ok();
            }).RequireAuthorization(Permission.ParameterUpdate.ToString())
            .WithTags(SwaggerSetup.ParameterTag);

        app.MapPost(ApiBaseRoute + "/{id:guid}/deactivate", async (
                Guid id,
                ISender sender,
                CancellationToken ct) =>
            {
                var command = new ChangeParameterStatusCommand(id, false);
                await sender.Send(command, ct);
                return Results.Ok();
            }).RequireAuthorization(Permission.ParameterUpdate.ToString())
            .WithTags(SwaggerSetup.ParameterTag);
    }
}