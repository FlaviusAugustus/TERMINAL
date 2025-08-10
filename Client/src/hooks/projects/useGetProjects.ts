import { keepPreviousData, useQuery } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";
import { Project } from "@api/models/Project";

export type ProjectsRequest = {
  pageNumber: number;
  pageSize: number;
  desc?: boolean;
};

export type ProjectsResponse = {
  rows: Project[];
  pageAmount: number;
  rowsAmount: number;
};

async function fetchDataProject(
  params: ProjectsRequest
): Promise<ProjectsResponse> {
  const projects = await apiClient.get("/projects", { params });
  const amountOfProjects = await apiClient.get("/projects/amount");
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
export function useProjects(params: ProjectsRequest) {
  return useQuery({
    queryKey: ["projects", params],
    queryFn: () => fetchDataProject(params),
    placeholderData: keepPreviousData,
  });
}
