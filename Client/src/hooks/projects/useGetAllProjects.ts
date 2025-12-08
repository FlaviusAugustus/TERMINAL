import { keepPreviousData, useQuery } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";
import { Project } from "@api/models/Project";

export type ProjectsRequest = {
  pageNumber: number;
  pageSize: number;
  desc?: boolean;
  searchPhrase?: string;
};

export type ProjectsResponse = {
  rows: Project[];
  pageAmount: number;
  rowsAmount: number;
};

async function fetchDataProject(
  params: ProjectsRequest
): Promise<ProjectsResponse> {
  let projects;
  let rowsAmount;
  if (params.searchPhrase) {
    projects = await apiClient.get("/projects/search", {
      params: {
        searchPhrase: params.searchPhrase,
        pageNumber: params.pageNumber,
        pageSize: params.pageSize,
      },
    });
    rowsAmount = projects.data.totalAmount;
    return {
      rows: projects.data.projects,
      pageAmount: Math.ceil(rowsAmount / params.pageSize),
      rowsAmount,
    };
  } else {
    projects = await apiClient.get("/projects/all", {
      params: {
        pageNumber: params.pageNumber,
        pageSize: params.pageSize,
        desc: params.desc,
      },
    });
    const amountOfProjects = await apiClient.get("/projects/amount/all");
    rowsAmount = amountOfProjects.data;
    return {
      rows: projects.data.projects,
      pageAmount: Math.ceil(rowsAmount / params.pageSize),
      rowsAmount,
    };
  }
}

/**
 * useProjects Hook
 *
 * Fetches a list of projects based on the provided parameters.
 *
 * @hook
 * @param {ProjectsRequest} params - The parameters for the projects request.
 */
export function useAllProjects(params: ProjectsRequest) {
  return useQuery({
    queryKey: ["projects", "all", params],
    queryFn: () => fetchDataProject(params),
    placeholderData: keepPreviousData,
  });
}
