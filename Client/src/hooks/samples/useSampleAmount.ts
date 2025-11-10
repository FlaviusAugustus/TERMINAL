import apiClient from "@api/apiClient";
import useIsOnline from "@hooks/useIsOnline";
import { useQuery } from "@tanstack/react-query";

/**
 * useGetSampleAmount Hook
 *
 * Fetches the total number of samples from the API.
 *
 * @hook
 */
function useGetSampleAmount() {
  const online = useIsOnline();
  return useQuery({
    queryKey: ["amount", "samples"],
    queryFn: async () => await apiClient.get<number>("/samples/amount"),
    enabled: online,
  });
}

export { useGetSampleAmount };
