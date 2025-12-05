using Serilog;
using Terminal.Backend.Api.Modules;
using Terminal.Backend.Application;
using Terminal.Backend.Core;
using Terminal.Backend.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddCore()
    .AddApplication()
    .AddInfrastructure(builder.Configuration);

builder.Services
    .AddSwaggerGen();

builder.Host.UseSerilog((context, loggerConfiguration) =>
{
    loggerConfiguration
        .WriteTo.Console();

    if (context.HostingEnvironment.IsProduction())
    {
        loggerConfiguration
            .WriteTo.File(context.Configuration["LogFile"] ?? "terminal.log");
    }
});

var app = builder.Build();
await app.UseInfrastructureAsync();
app.UsePingEndpoints();
app.UseProjectsEndpoints();
app.UsePrefixEndpoints();
app.UseTagEndpoints();
app.UseRecipesEndpoints();
app.UseParametersEndpoints();
app.UseProcessesEndpoints();
app.UseUsersEndpoints();
app.Run();

namespace Terminal.Backend.Api
{
    public class Program
    {
    }
}