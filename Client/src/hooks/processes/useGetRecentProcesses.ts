import apiClient from "@api/apiClient";
import { Process } from "@api/models/Process.ts";
import useIsOnline from "@hooks/useIsOnline";
import { useQuery } from "@tanstack/react-query";

export type RecentProcessesResponse = {
  recentSamples: Process[];
};

async function fetchRecentProcesses(length: number) {
  return await apiClient.get<RecentProcessesResponse>("process/recent", {
    params: { length: length },
  });
}

/**
 * useGetRecentSamples Hook
 *
 * A custom hook that fetches recent processes from the API.
 *
 * @hook
 */
function useGetRecentProcesses(length: number) {
  const online = useIsOnline();
  return useQuery({
    queryKey: ["recent", "processes"],
    queryFn: () => fetchRecentProcesses(length),
    enabled: online,
  });
}

export default useGetRecentProcesses;
