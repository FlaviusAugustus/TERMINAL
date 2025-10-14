import { useQuery } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";
import { Recipe } from "@api/models/Recipe";

export type RecipesSearchParams = {
  searchPhrase: string;
  pageNumber: number;
  pageSize: number;
};

export type RecipeSearchResult = {
  rows: Recipe[];
  pageAmount: number;
  rowsAmount: number;
};

async function fetchRecipes(
  params: RecipesSearchParams
): Promise<RecipeSearchResult> {
  const response = await apiClient.get("/recipes/search", { params });
  return {
    rows: response.data.recipes,
    pageAmount: Math.ceil(response.data.totalAmount / params.pageSize),
    rowsAmount: response.data.totalAmount,
  };
}

/**
 * useSearchRecipes Hook
 *
 * A custom hook that fetches recipes data based on a search phrase.
 * It returns the recipes data for the given search parameters.
 *
 * @hook
 * @param {RecipesSearchParams} params - The parameters for the recipe search request.
 */
export function useSearchRecipes(params: RecipesSearchParams) {
  return useQuery({
    queryKey: ["recipesSearch", params],
    queryFn: () => fetchRecipes(params),
    enabled: !!params.searchPhrase,
  });
}
