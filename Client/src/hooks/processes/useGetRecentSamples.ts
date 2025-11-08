import apiClient from "@api/apiClient";
import { Process } from "@api/models/Process.ts";
import { useQuery } from "@tanstack/react-query";

export type RecentSamplesResponse = {
  recentSamples: Process[];
};

async function fetchRecentSamples(length: number) {
  return await apiClient.get<RecentSamplesResponse>("samples/recent", {
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
function useGetRecentSamples(length: number) {
  return useQuery({
    queryKey: ["recent", "samples"],
    queryFn: () => fetchRecentSamples(length),
  });
}

export default useGetRecentSamples;
