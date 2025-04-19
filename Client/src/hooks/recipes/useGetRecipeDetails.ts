import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {RecipeDetailsDto} from "@api/terminalSchemas.ts";
import apiClient from "@api/apiClient.ts";


async function fetchRecipeDetails(id: string|null):Promise<RecipeDetailsDto>{
    return (await apiClient.get(`/recipes/${id}/details`)).data;
}


export function useRecipeDetails(id: string|null ){
    return useQuery({
        queryKey:['recipeDetails', id],
        queryFn: () => fetchRecipeDetails(id),
        placeholderData: keepPreviousData,
        enabled: (id !== null)
    })
}