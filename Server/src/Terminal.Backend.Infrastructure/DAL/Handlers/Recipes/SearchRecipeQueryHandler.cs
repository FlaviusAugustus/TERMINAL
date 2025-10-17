using MediatR;
using Microsoft.EntityFrameworkCore;
using Terminal.Backend.Application.DTO.Recipes;
using Terminal.Backend.Application.Queries.Recipes.Search;
using Terminal.Backend.Core.Entities;

namespace Terminal.Backend.Infrastructure.DAL.Handlers.Recipes;

internal sealed class SearchRecipeQueryHandler : IRequestHandler<SearchRecipeQuery, GetSearchedRecipesDto>
{
    private readonly DbSet<Recipe> _recipes;

    public SearchRecipeQueryHandler(TerminalDbContext dbContext)
    {
        _recipes = dbContext.Recipes;
    }

    public async Task<GetSearchedRecipesDto> Handle(SearchRecipeQuery request, CancellationToken cancellationToken)
        {
            var query = _recipes
                        .AsNoTracking()
                        .Where(p => EF.Functions.ILike(p.RecipeName, $"%{request.SearchPhrase}%"));

            var amount = await query.CountAsync(cancellationToken);

            var recipes = await query
                .Select(p => new GetSearchedRecipesDto.RecipeDto(p.Id, p.RecipeName))
                .ToListAsync(cancellationToken);

            return new GetSearchedRecipesDto(recipes, amount);
        }
}