using MediatR;
using Terminal.Backend.Application.Abstractions;
using Terminal.Backend.Core.Abstractions.Repositories;
using Terminal.Backend.Core.Entities;
using Terminal.Backend.Core.Exceptions;
using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Application.Commands.Recipe.Create;

internal sealed class CreateRecipeCommandHandler : IRequestHandler<CreateRecipeCommand>
{
    private readonly IConvertDtoService _convertDtoService;
    private readonly IRecipeRepository _recipeRepository;

    public CreateRecipeCommandHandler(IConvertDtoService convertDtoService, IRecipeRepository recipeRepository)
    {
        _convertDtoService = convertDtoService;
        _recipeRepository = recipeRepository;
    }

    public async Task Handle(CreateRecipeCommand request, CancellationToken cancellationToken)
    {
        var (id, name, steps) = request;

        if (!await _recipeRepository.IsNameUniqueAsync(name, cancellationToken))
        {
            throw new InvalidRecipeNameException(name);
        }

        var recipe = new Core.Entities.Recipe(id, name);
        foreach (var step in await _convertDtoService.ConvertAsync(steps, cancellationToken))
        {
            recipe.Steps.Add(new RecipeStep(StepId.Create(), step.Comment, step.Parameters, recipe));
        }

        await _recipeRepository.AddAsync(recipe, cancellationToken);
    }
}