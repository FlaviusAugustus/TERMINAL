import { keepPreviousData, useQuery } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";
import { ProjectDetailsDto } from "@api/models/Project";

async function fetchProjectDetails(
  id: string | null,
): Promise<ProjectDetailsDto> {
  return (await apiClient.get(`/projects/${id}`)).data;
}

/**
 * Custom hook to fetch project details by ID.
 *
 * This hook uses React Query to manage the fetching state and caching of project details.
 * It will return the project details for the given ID, or keep previous data while loading new data.
 * It is enabled only when the ID is not null.
 *
 * @hook
 */
export function useProjectDetails(id: string | null) {
  return useQuery({
    queryKey: ["projectDetails", id],
    queryFn: () => fetchProjectDetails(id),
    placeholderData: keepPreviousData,
    enabled: id !== null,
  });
}
