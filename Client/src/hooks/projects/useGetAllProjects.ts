import { ProjectDto } from "@api/terminalSchemas.ts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";

export type ProjectsRequest = {
  pageNumber: number;
  pageSize: number;
  desc?: boolean;
};

export type ProjectsResponse = {
  rows: ProjectDto[];
  pageAmount: number;
  rowsAmount: number;
};

async function fetchDataProject(
  params: ProjectsRequest,
): Promise<ProjectsResponse> {
  const projects = await apiClient.get("/projects/all", { params });
  const amountOfProjects = await apiClient.get("/projects/amount/all");
  return {
    rows: projects.data.projects,
    pageAmount: Math.ceil(amountOfProjects.data / params.pageSize),
    rowsAmount: amountOfProjects.data,
  };
}

/**
 * useProjects Hook
 *
 * Fetches a list of projects based on the provided parameters.
 *
 * @hook
 * @param {ProjectsRequest} params - The parameters for the project request.
 */
export function useAllProjects(params: ProjectsRequest) {
  return useQuery({
    queryKey: ["projects", "all", params],
    queryFn: () => fetchDataProject(params),
    placeholderData: keepPreviousData,
  });
}
