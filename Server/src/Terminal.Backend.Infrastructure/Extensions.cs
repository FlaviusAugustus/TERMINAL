using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerUI;
using Terminal.Backend.Application.Abstractions;
using Terminal.Backend.Core.Entities;
using Terminal.Backend.Core.ValueObjects;
using Terminal.Backend.Infrastructure.Administrator;
using Terminal.Backend.Infrastructure.Authentication;
using Terminal.Backend.Infrastructure.Authentication.OptionsSetup;
using Terminal.Backend.Infrastructure.Authentication.Requirements;
using Terminal.Backend.Infrastructure.DAL;
using Terminal.Backend.Infrastructure.DAL.Behaviours;
using Terminal.Backend.Infrastructure.DAL.Services;
using Terminal.Backend.Infrastructure.Mails;
using Terminal.Backend.Infrastructure.Middleware;
using IAuthorizationService = Terminal.Backend.Infrastructure.Authentication.IAuthorizationService;

namespace Terminal.Backend.Infrastructure;

public static class Extensions
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddControllers();
        services.AddSingleton<ExceptionMiddleware>();
        services.AddHttpContextAccessor();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(c =>
        {
            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Description = "JWT Authorization header using the Bearer scheme. Use 'Bearer {token}' format.",
                Name = "Authorization",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer"
            });

            c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        },
                        Scheme = "oauth2",
                        Name = "Bearer",
                        In = ParameterLocation.Header,
                    },
                    new List<string>()
                }
            });
        });
        services.AddCors();
        services.AddPostgres(configuration);
        services.AddMediatR(cfg =>
        {
            cfg.RegisterServicesFromAssembly(AssemblyReference.Assembly);
            cfg.AddOpenBehavior(typeof(UnitOfWorkBehaviour<,>));
        });

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new()
                {
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };
            });
        services.AddAuthorization();
        services.AddAuthorizationBuilder()
            .AddPolicy(Role.Registered, policy => { policy.AddRequirements(new RoleRequirement(Role.Registered)); })
            .AddPolicy(Role.Guest, policy => { policy.AddRequirements(new RoleRequirement(Role.Guest)); })
            .AddPolicy(Role.Moderator, policy => { policy.AddRequirements(new RoleRequirement(Role.Moderator)); })
            .AddPolicy(Role.Administrator,
                policy => { policy.AddRequirements(new RoleRequirement(Role.Administrator)); });
        services.AddScoped<IAuthorizationService, AuthorizationService>();
        services.AddSingleton<IAuthorizationPolicyProvider, PermissionAuthorizationPolicyProvider>();
        services.AddSingleton<IAuthorizationHandler, PermissionAuthorizationHandler>();
        services.AddSingleton<IAuthorizationHandler, RoleAuthorizationHandler>();
        services.ConfigureOptions<JwtOptionsSetup>();
        services.ConfigureOptions<JwtBearerOptionsSetup>();
        services.ConfigureOptions<AdministratorOptionsSetup>();
        services.AddScoped<IJwtProvider, JwtProvider>();
        services.AddScoped<IMailService, MailService>();
        services.AddScoped<ICodeGeneratorService, CodeGeneratorService>();
        services.AddScoped<TerminalDbSeeder>();

        return services;
    }


    public static async Task UseInfrastructureAsync(this WebApplication app)
    {
        app.UseMiddleware<ExceptionMiddleware>();
        if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.DocExpansion(DocExpansion.None);
                c.EnableFilter();
                c.EnableDeepLinking();
            });
            app.UseCors(x => x
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowAnyOrigin());
        }

        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();

        using (var scope = app.Services.CreateScope())
        {
            var serviceProvider = scope.ServiceProvider;
            var dbContext = serviceProvider.GetRequiredService<TerminalDbContext>();

            if (app.Environment.IsProduction())
            {
                dbContext.Database.EnsureCreated();
            }
            if (app.Environment.IsDevelopment())
            {
                dbContext.Database.Migrate();
            }

            try
            {
                var seeder = serviceProvider.GetRequiredService<TerminalDbSeeder>();
                await seeder.SeedAsync();
            }
            catch (Exception ex)
            {
                throw; 
            }
        }
    }

    public static WebApplication UseInfrastructure(this WebApplication app)
    {
        app.UseMiddleware<ExceptionMiddleware>();
        if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.DocExpansion(DocExpansion.None);
                c.EnableFilter();
                c.EnableDeepLinking();
            });
            app.UseCors(x => x
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowAnyOrigin());
        }

        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();

        using var scope = app.Services.CreateScope();

        using var dbContext = scope.ServiceProvider.GetRequiredService<TerminalDbContext>();

        if (app.Environment.IsProduction())
        {
            dbContext.Database.EnsureCreated();
        }

        if (app.Environment.IsDevelopment())
        {
            dbContext.Database.Migrate();
        }
        return app;
    }

    public static T GetOptions<T>(this IConfiguration configuration, string sectionName) where T : class, new()
    {
        var options = new T();
        var section = configuration.GetRequiredSection(sectionName);
        section.Bind(options);

        return options;
    }
}