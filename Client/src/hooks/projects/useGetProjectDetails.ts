import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {ProjectDetailsDto} from "@api/terminalSchemas.ts";
import apiClient from "@api/apiClient.ts";


async function fetchProjectDetails(id: string|null):Promise<ProjectDetailsDto>{
    return (await apiClient.get(`/projects/${id}`)).data;
}


export function useProjectDetails(id: string|null ){
    return useQuery({
        queryKey:['projectDetails', id],
        queryFn: () => fetchProjectDetails(id),
        placeholderData: keepPreviousData,
        enabled: (id !== null)
    })
}