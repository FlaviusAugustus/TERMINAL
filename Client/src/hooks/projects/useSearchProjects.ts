import { useQuery } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";
import { Project } from "@api/models/Project";

export type ProjectsSearchParams = {
  searchPhrase: string;
  pageNumber: number;
  pageSize: number;
};

export type ProjectSearchResult = {
  rows: Project[];
  pageAmount: number;
  rowsAmount: number;
};

async function fetchProjects(
  params: ProjectsSearchParams
): Promise<ProjectSearchResult> {
  const response = await apiClient.get("/projects/search", { params });
  return {
    rows: response.data.projects,
    pageAmount: Math.ceil(response.data.totalAmount / params.pageSize),
    rowsAmount: response.data.totalAmount,
  };
}

/**
 * useSearchProjects Hook
 *
 * A custom hook that fetches projects data based on a search phrase.
 * It returns the projects data for the given search parameters.
 *
 * @hook
 * @param {ProjectsSearchParams} params - The parameters for the project search request.
 */
export function useSearchProjects(params: ProjectsSearchParams) {
  return useQuery({
    queryKey: ["projectsSearch", params],
    queryFn: () => fetchProjects(params),
    enabled: !!params.searchPhrase,
  });
}
