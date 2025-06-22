import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";
import { AxiosResponse } from "axios";
import { RecipeDetailsDto, UpdateRecipeRequest } from "@api/terminalSchemas";

async function editRecipe(
  recipe: UpdateRecipeRequest,
  id: string,
): Promise<AxiosResponse> {
  return await apiClient.patch(`recipes/${id}`, { ...recipe });
}

/**
 * useEditRecipe Hook
 *
 * A custom hook for updating a recipe.
 *
 * @hook
 */
export function useEditSample() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recipe: RecipeDetailsDto) => editRecipe(recipe, recipe.id),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(["recipeDetails", variables.id], () => {
        return {
          ...variables,
        } satisfies RecipeDetailsDto;
      });
    },
  });
}

export default useEditSample;
