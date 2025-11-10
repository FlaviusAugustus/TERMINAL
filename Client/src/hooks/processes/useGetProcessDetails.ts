import apiClient from "@api/apiClient.ts";
import { ProcessDetailsDto } from "@api/models/Process.ts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

async function fetchDataSampleDetails(
  id: string | null
): Promise<ProcessDetailsDto> {
  return (await apiClient.get(`/process/${id}`)).data;
}

/**
 * useSampleDetails Hook
 *
 * A custom hook that fetches the details of a sample by its ID.
 *
 * @hook
 */
export function useSampleDetails(id: string | null) {
  return useQuery({
    queryKey: ["processDetails", id],
    queryFn: () => fetchDataSampleDetails(id),
    placeholderData: keepPreviousData,
    enabled: id !== null,
  });
}
