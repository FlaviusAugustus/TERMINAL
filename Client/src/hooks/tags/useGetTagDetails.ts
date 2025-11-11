import apiClient from "@api/apiClient.ts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Tag } from "@api/models/Tag.ts";
import useIsOnline from "@hooks/useIsOnline";

async function fetchTagDetails(id: string | null): Promise<Tag> {
  return (await apiClient.get(`/tags/${id}`)).data;
}

/**
 * useSampleDetails Hook
 *
 * A custom hook that fetches the details of a sample by its ID.
 *
 * @hook
 */
export function useGetTagDetails(id: string | null) {
  const online = useIsOnline();
  return useQuery({
    queryKey: ["tagDetails", id],
    queryFn: () => fetchTagDetails(id),
    placeholderData: keepPreviousData,
    enabled: id !== null && online,
  });
}
