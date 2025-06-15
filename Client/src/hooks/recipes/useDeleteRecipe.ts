import {useMutation, useQueryClient} from "@tanstack/react-query";
import {RecipesRequest} from "@hooks/recipes/useGetRecipes";
import apiClient from "@api/apiClient.ts";
import {AxiosResponse} from "axios";

async function deleteRecipe(id: string | undefined): Promise<AxiosResponse> {
    return await apiClient.delete(`recipes/${id}`);
}

/**
 * useDeleteRecipe Hook
 *
 * A custom hook that provides functionality to delete a recipe.
 *
 * @hook
 */
export function useDeleteRecipe(params: RecipesRequest) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteRecipe(id),
        onSuccess: (_data, variables) => {
            queryClient.setQueryData(['recipeDetails', variables], (() => null))
            queryClient.invalidateQueries({queryKey: ['recipes', params]})
        }
    });
}