import apiClient from "@api/apiClient.ts";
<<<<<<< HEAD:Client/src/hooks/samples/useGetSampleDetails.ts
import { SampleDetailsDto } from "@api/models/Sample";
import useIsOnline from "@hooks/useIsOnline";
=======
import { ProcessDetailsDto } from "@api/models/Process.ts";
>>>>>>> origin/main:Client/src/hooks/processes/useGetProcessDetails.ts
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
  const online = useIsOnline();
  return useQuery({
    queryKey: ["processDetails", id],
    queryFn: () => fetchDataSampleDetails(id),
    placeholderData: keepPreviousData,
    enabled: id !== null && online,
  });
}
