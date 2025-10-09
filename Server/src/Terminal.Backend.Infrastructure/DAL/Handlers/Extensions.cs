using System.Linq.Expressions;
using Terminal.Backend.Application.DTO.Parameters;
using Terminal.Backend.Application.DTO.ParameterValues;
using Terminal.Backend.Application.DTO.Projects;
using Terminal.Backend.Application.DTO.Recipes;
using Terminal.Backend.Application.DTO.Samples;
using Terminal.Backend.Application.DTO.Tags;
using Terminal.Backend.Application.DTO.Users;
using Terminal.Backend.Application.DTO.Users.Invitations;
using Terminal.Backend.Application.Exceptions;
using Terminal.Backend.Application.Queries.QueryParameters;
using Terminal.Backend.Core.Entities;
using Terminal.Backend.Core.Entities.Parameters;
using Terminal.Backend.Core.Entities.ParameterValues;

namespace Terminal.Backend.Infrastructure.DAL.Handlers;

public static class Extensions
{
    public static GetProjectsDto AsGetProjectsDto(this IEnumerable<Project> entities)
        => new()
        {
            Projects = entities.Select(p => new GetProjectsDto.ProjectDto(p.Id, p.Name, p.IsActive))
        };

    public static GetRecipesDto AsGetRecipesDto(this IEnumerable<Recipe> entities)
        => new()
        {
            Recipes = entities.Select(r => new GetRecipesDto.RecipeDto(r.Id, r.RecipeName))
        };

    public static GetProjectDto AsGetProjectDto(this Project entity)
        => new()
        {
            Id = entity.Id,
            Name = entity.Name,
            IsActive = entity.IsActive,
            SamplesIds = entity.Samples.Select(m => m.Id.Value)
        };

    public static GetTagsDto AsGetTagsDto(this IEnumerable<Tag> entities)
        => new()
        {
            Tags = entities.Select(t => new GetTagsDto.TagDto(t.Id, t.Name))
        };

    public static GetTagDto AsGetTagDto(this Tag entity)
        => new(entity.Id, entity.Name, entity.IsActive);

    public static GetSampleDto AsGetSampleDto(this Sample entity)
        => new()
        {
            Id = entity.Id.Value,
            ProjectId = entity.Project.Id.Value,
            Recipe = entity.Recipe?.AsDto(),
            Code = entity.Code.Value,
            Comment = entity.Comment.Value,
            CreatedAtUtc = entity.CreatedAtUtc.ToString("o"),
            Steps = entity.Steps.AsStepsDto(),
            Tags = entity.Tags.Select(t => new GetTagsDto.TagDto(t.Id, t.Name))
        };

    public static IEnumerable<GetSampleStepsDto> AsStepsDto<TStep>(this IEnumerable<TStep> steps)
        where TStep : Step
        => steps.Select(s => new GetSampleStepsDto(
            s.Id,
            s.Parameters.Select(p =>
            {
                GetSampleBaseParameterValueDto b = p switch
                {
                    DecimalParameterValue d => new GetSampleDecimalParameterValueDto(d.Parameter.Id, d.Parameter.Name,
                        d.Value, (d.Parameter as DecimalParameter)!.Unit),
                    IntegerParameterValue i => new GetSampleIntegerParameterValueDto(i.Parameter.Id, i.Parameter.Name,
                        i.Value, (i.Parameter as IntegerParameter)!.Unit),
                    TextParameterValue t => new GetSampleTextParameterValueDto(t.Parameter.Id, t.Parameter.Name,
                        t.Value, (p.Parameter as TextParameter)!.AllowedValues),
                    _ => throw new ArgumentOutOfRangeException(nameof(p))
                };
                return b;
            }), s.Comment));

    // public static IEnumerable<GetSampleStepsDto> AsStepsDto(this IEnumerable<RecipeStep> steps)
    //     => steps.Select(s => new GetSampleStepsDto(
    //         s.Parameters.Select(p =>
    //         {
    //             GetSampleBaseParameterValueDto b = p switch
    //             {
    //                 DecimalParameterValue d => new GetSampleDecimalParameterValueDto(d.Parameter.Id, d.Parameter.Name, d.Value, (d.Parameter as DecimalParameter)!.Unit),
    //                 IntegerParameterValue i => new GetSampleIntegerParameterValueDto(i.Parameter.Id, i.Parameter.Name, i.Value, (i.Parameter as IntegerParameter)!.Unit),
    //                 TextParameterValue t => new GetSampleTextParameterValueDto(t.Parameter.Id, t.Parameter.Name, t.Value),
    //                 _ => throw new ArgumentOutOfRangeException(nameof(p))
    //             };
    //             return b;
    //         }), s.Comment));

    public static GetUserDto AsGetUserDto(this User entity)
        => new()
        {
            Id = entity.Id,
            Email = entity.Email,
            Role = entity.Role,
        };

    public static GetParametersDto AsGetParametersDto(this IEnumerable<Parameter> parameters)
    {
        return new GetParametersDto
        {
            Parameters = parameters.Select(MapParameters)
        };
    }

    private static GetParameterDto MapParameters(Parameter parameter)
    {
        return parameter switch
        {
            IntegerParameter i => new GetIntegerParameterDto(i.Id, i.Name, i.Unit, i.Step, i.Order, i.DefaultValue,
                i.Parent?.Id.Value),
            DecimalParameter d => new GetDecimalParameterDto(d.Id, d.Name, d.Unit, d.Step, d.Order, d.DefaultValue,
                d.Parent?.Id.Value),
            TextParameter t => new GetTextParameterDto(t.Id, t.Name, t.AllowedValues, t.Order, t.DefaultValue,
                t.Parent?.Id.Value),
            _ => throw new ArgumentOutOfRangeException(nameof(parameter))
        };
    }

    public static IQueryable<T> Paginate<T>(this IQueryable<T> queryable, PagingParameters parameters)
        => queryable.Skip(parameters.PageNumber * parameters.PageSize).Take(parameters.PageSize);

    public static IOrderedQueryable<TEntity> OrderBy<TEntity>(this IQueryable<TEntity> source,
        OrderingParameters parameters)
    {
        var command = parameters.Desc ? "OrderByDescending" : "OrderBy";
        var type = typeof(TEntity);
        var parameter = Expression.Parameter(type, "p");

        // Split the column name into individual property names
        var properties = parameters.OrderBy.Split('.');

        // Build expression for each property in the chain
        Expression propertyAccess = parameter;
        foreach (var property in properties)
        {
            var propertyInfo = type.GetProperty(property);
            if (propertyInfo is null)
            {
                throw new ColumnNotFoundException(property);
            }

            propertyAccess = Expression.MakeMemberAccess(propertyAccess, propertyInfo);
            type = propertyInfo.PropertyType; // Update type for the next iteration
        }

        var orderByExpression = Expression.Lambda(propertyAccess, parameter);
        var resultExpression = Expression.Call(typeof(Queryable), command, new Type[] { typeof(TEntity), type },
            source.Expression, Expression.Quote(orderByExpression));

        return (IOrderedQueryable<TEntity>)source.Provider.CreateQuery<TEntity>(resultExpression);
    }

    public static GetRecipeDto AsDto(this Recipe recipe) => new(recipe.Id, recipe.RecipeName);

    public static GetInvitationDto AsGetInvitationDto(this Invitation invitation) =>
        new(invitation.ExpiresIn > DateTime.UtcNow, invitation.User.Email);
}