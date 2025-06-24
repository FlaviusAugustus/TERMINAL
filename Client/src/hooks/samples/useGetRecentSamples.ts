import apiClient from "@api/apiClient";
import { Sample } from "@api/models/Sample";
import { useQuery } from "@tanstack/react-query";

export type RecentSamplesResponse = {
  recentSamples: Sample[];
};

async function fetchRecentSamples(length: number) {
  return await apiClient.get<RecentSamplesResponse>("samples/recent", {
    params: { length: length },
  });
}

/**
 * useGetRecentSamples Hook
 *
 * A custom hook that fetches recent samples from the API.
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
