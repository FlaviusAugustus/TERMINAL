import apiClient from "@api/apiClient";
import { usePrefetchQuery, useQuery } from "@tanstack/react-query";

const queryArg = {
  queryKey: ["amount", "samples"],
  queryFn: async () => await apiClient.get<number>("/samples/amount"),
};

/**
 * useGetSampleAmount Hook
 *
 * Fetches the total number of processes from the API.
 *
 * @hook
 */
function useGetSampleAmount() {
  return useQuery(queryArg);
}

/**
 * usePrefetchSampleAmount Hook
 *
 * Prefetches the total number of processes from the API.
 *
 * @hook
 */
function usePrefetchSampleAmount() {
  return usePrefetchQuery(queryArg);
}
export { useGetSampleAmount, usePrefetchSampleAmount };
