using System.Security.Cryptography;
using System.Text;
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
    
    public static string Hash(string token)
    {
        var rawHash = SHA256.HashData(Encoding.UTF8.GetBytes(token));
        
        return Convert.ToBase64String(rawHash);
    }
}