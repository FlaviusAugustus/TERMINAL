import apiClient from "@api/apiClient";
import { usePrefetchQuery, useQuery } from "@tanstack/react-query";

const queryArg = {
  queryKey: ["amount", "recipes"],
  queryFn: async () => await apiClient.get<number>("/recipes/amount"),
};

function useGetRecipeAmount() {
  return useQuery(queryArg);
}

function usePrefetchRecipeAmount() {
  return usePrefetchQuery(queryArg);
}
export { useGetRecipeAmount, usePrefetchRecipeAmount };
