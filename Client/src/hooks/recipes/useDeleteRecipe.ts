import {useMutation, useQueryClient} from "@tanstack/react-query";
import {RecipesResponse, RecipesRequest} from "@hooks/recipes/useGetRecipes";
import apiClient from "@api/apiClient.ts";
import {AxiosResponse} from "axios";

async function deleteRecipe(id: string | undefined): Promise<AxiosResponse> {
    return await apiClient.delete(`recipes/${id}`);
}

export function useDeleteRecipe(params: RecipesRequest) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteRecipe(id),
        onSuccess: (_data, variables) => {
            queryClient.setQueryData(['recipeDetails', variables], (() => null))
            queryClient.setQueryData(['recipes', params], ((recipes: RecipesResponse): RecipesResponse =>
                    (
                        {
                            ...recipes,
                            rows: recipes.rows.filter((row) => row.id !== variables)
                        }
                    )
            ))
        }
    });
}