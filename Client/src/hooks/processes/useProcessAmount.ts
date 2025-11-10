import apiClient from "@api/apiClient";
import useIsOnline from "@hooks/useIsOnline";
import { useQuery } from "@tanstack/react-query";

/**
 * useGetSampleAmount Hook
 *
 * Fetches the total number of processes from the API.
 *
 * @hook
 */
export function useGetProcessAmount() {
  const online = useIsOnline();
  return useQuery({
    queryKey: ["amount", "processes"],
    queryFn: async () => await apiClient.get<number>("/process/amount"),
    enabled: online,
  });
}
