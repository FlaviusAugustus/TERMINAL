import {ProjectDto} from "@api/terminalSchemas.ts";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";

export type ProjectsRequest = {
    pageNumber: number;
    pageSize: number;
    desc?: boolean;
}

export type ProjectsQueryResponse = {
    rows: ProjectDto[];
    pageAmount: number;
    rowsAmount: number;
}

async function fetchDataProject(params:ProjectsRequest): Promise<ProjectsQueryResponse> {
    const projects = await apiClient.get('/projects', {params});
    const amountOfProjects = await apiClient.get('/projects/amount');
    return{
        rows: projects.data.projects,
        pageAmount: Math.ceil(amountOfProjects.data / params.pageSize),
        rowsAmount: amountOfProjects.data,
    }
}

export function useProjects(params: ProjectsRequest) {
    return useQuery(
        {
            queryKey: ['projects', params],
            queryFn: () => fetchDataProject(params),
            placeholderData: keepPreviousData
        }
    )
}

