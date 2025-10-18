using MediatR;
using Terminal.Backend.Application.Abstractions;
using Terminal.Backend.Application.Exceptions;
using Terminal.Backend.Core.Abstractions.Repositories;
using Terminal.Backend.Core.Entities;
using Terminal.Backend.Core.Exceptions;
using Terminal.Backend.Core.ValueObjects;
using ParameterValue = Terminal.Backend.Core.Entities.ParameterValues.ParameterValue;

namespace Terminal.Backend.Application.Commands.Process.Create;

internal sealed class CreateProcessCommandHandler : IRequestHandler<CreateProcessCommand>
{
    private readonly IConvertDtoService _convertService;
    private readonly IRecipeRepository _recipeRepository;
    private readonly IProcessRepository _processRepository;
    private readonly IProjectRepository _projectRepository;

    public CreateProcessCommandHandler(IConvertDtoService convertService,
        IRecipeRepository recipeRepository, IProcessRepository processRepository, IProjectRepository projectRepository)
    {
        _convertService = convertService;
        _recipeRepository = recipeRepository;
        _processRepository = processRepository;
        _projectRepository = projectRepository;
    }

    public async Task Handle(CreateProcessCommand command, CancellationToken ct)
    {
        var (sampleId, projectsDto, recipeId, stepsDto, tagsDto,
            comment, saveAsRecipe, recipeName) = command;

        var steps = (await _convertService.ConvertAsync(stepsDto, ct)).ToList();
        Core.Entities.Recipe? recipe = null;
        if (saveAsRecipe)
        {
            if (string.IsNullOrWhiteSpace(recipeName))
            {
                throw new InvalidRecipeNameException(recipeName);
            }

            // for new recipe we need to copy every step, and every parameter value in steps
            recipe = new Core.Entities.Recipe(RecipeId.Create(), recipeName);
            foreach (var step in steps)
            {
                var parameters = new List<ParameterValue>(step.Parameters
                    .Select(p => p.DeepCopy(Guid.NewGuid())));
                recipe.Steps.Add(new RecipeStep(Guid.NewGuid(), step.Comment, parameters, recipe));
            }

            await _recipeRepository.AddAsync(recipe, ct);
        }
        else if (recipeId is not null)
        {
            recipe = await _recipeRepository.GetAsync(recipeId, ct)
                     ?? throw new RecipeNotFoundException(recipeId);
        }

        var tags = await _convertService.ConvertAsync(tagsDto.Select(t => new TagId(t)), ct);
        var projects = (await _convertService.ConvertAsync(projectsDto.Select(p => new ProjectId(p)), ct)).ToList();
        var process = new Core.Entities.Process(sampleId,
            projects,
            recipe,
            new Comment(comment),
            steps.ToList(),
            tags.ToList());
        foreach (var project in projects)
        {
            project.Processes.Add(process);
        }
        await _processRepository.AddAsync(process, ct);
    }
}