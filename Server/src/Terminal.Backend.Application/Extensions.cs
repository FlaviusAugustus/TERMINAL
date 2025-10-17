using Microsoft.Extensions.DependencyInjection;
using Terminal.Backend.Application.Abstractions;
using Terminal.Backend.Application.Invitations;
using Terminal.Backend.Application.Invitations.Factories;
using Terminal.Backend.Application.Services;
using Terminal.Backend.Core.Abstractions.Factories;

namespace Terminal.Backend.Application;

public static class Extensions
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddMediatR(cfg => { cfg.RegisterServicesFromAssembly(AssemblyReference.Assembly); });

        services.AddOptions<InvitationOptions>()
            .BindConfiguration("Invitations")
            .ValidateDataAnnotations()
            .ValidateOnStart();
        
        services.AddScoped<IConvertDtoService, ConvertDtoService>();
        services.AddScoped<IPasswordHasher, PasswordHasher>();
        services.AddScoped<IInvitationFactory, InvitationFactory>();

        return services;
    }
}