import apiClient from "@api/apiClient";
import { usePrefetchQuery, useQuery } from "@tanstack/react-query";

const queryArg = {
  queryKey: ["amount", "processes"],
  queryFn: async () => await apiClient.get<number>("/process/amount"),
};

/**
 * useGetSampleAmount Hook
 *
 * Fetches the total number of processes from the API.
 *
 * @hook
 */
function useGetProcessAmount() {
  return useQuery(queryArg);
}

/**
 * usePrefetchSampleAmount Hook
 *
 * Prefetches the total number of processes from the API.
 *
 * @hook
 */
function usePrefetchProcessAmount() {
  return usePrefetchQuery(queryArg);
}

export { useGetProcessAmount, usePrefetchProcessAmount };
