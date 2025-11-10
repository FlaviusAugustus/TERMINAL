import apiClient from "@api/apiClient";
import useIsOnline from "@hooks/useIsOnline";
import { usePrefetchQuery, useQuery } from "@tanstack/react-query";

const queryArg = {
  queryKey: ["amount", "recipes"],
  queryFn: async () => await apiClient.get<number>("/recipes/amount"),
};

/**
 * useGetRecipeAmount Hook
 *
 * A custom hook to fetch the total number of recipes.
 *
 * @hook
 */
function useGetRecipeAmount() {
  const online = useIsOnline();
  return useQuery({ ...queryArg, enabled: online });
}

/**
 * usePrefetchRecipeAmount Hook
 *
 * A custom hook to prefetch the total number of recipes.
 *
 * @hook
 */
function usePrefetchRecipeAmount() {
  return usePrefetchQuery(queryArg);
}
export { useGetRecipeAmount, usePrefetchRecipeAmount };
