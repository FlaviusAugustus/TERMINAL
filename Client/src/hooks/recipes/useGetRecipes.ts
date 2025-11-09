import { keepPreviousData, useQuery } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";
import { Recipe } from "@api/models/Recipe";
import useIsOnline from "@hooks/useIsOnline";

export type RecipesRequest = {
  pageNumber: number;
  pageSize: number;
  desc?: boolean;
  searchPhrase?: string;
};

export type RecipesResponse = {
  rows: Recipe[];
  pageAmount: number;
  rowsAmount: number;
};

async function fetchDataRecipes(
  params: RecipesRequest
): Promise<RecipesResponse> {
  let recipes;
  let rowsAmount;
  if (params.searchPhrase) {
    recipes = await apiClient.get("/recipes/search", {
      params: {
        searchPhrase: params.searchPhrase,
        pageNumber: params.pageNumber,
        pageSize: params.pageSize,
        desc: params.desc,
      },
    });
    rowsAmount = recipes.data.totalAmount;
    return {
      rows: recipes.data.recipes,
      pageAmount: Math.ceil(rowsAmount / params.pageSize),
      rowsAmount,
    };
  } else {
    recipes = await apiClient.get("/recipes", {
      params: {
        pageSize: params.pageSize,
        pageNumber: params.pageNumber,
        desc: params.desc,
      },
    });
    const amountOfRecipes = await apiClient.get("/recipes/amount");
    return {
      rows: recipes.data.recipes,
      pageAmount: Math.ceil(amountOfRecipes.data / params.pageSize),
      rowsAmount: amountOfRecipes.data,
    };
  }
}

/**
 * useRecipes Hook
 *
 * Fetches recipes data from the API based on the provided parameters.
 *
 * @hook
 * @param {RecipesRequest} params - The parameters for fetching recipes.
 */
export function useRecipes(params: RecipesRequest) {
  const online = useIsOnline();
  return useQuery({
    queryKey: ["recipes", params],
    queryFn: () => fetchDataRecipes(params),
    placeholderData: keepPreviousData,
    enabled: online,
  });
}
