import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {ProjectDetailsDto} from "@api/terminalSchemas.ts";
import apiClient from "@api/apiClient.ts";


async function fetchProjectDetails(id: string|null):Promise<ProjectDetailsDto>{
    if (id === null) return {isActive: false, samplesIds: [], id: "",name: ""};
    return (await apiClient.get(`/projects/${id}`)).data;
}


export function useProjectDetails(id: string|null ){
    return useQuery({
        queryKey:['projectDetails', id],
        queryFn: () => fetchProjectDetails(id),
        placeholderData: keepPreviousData
    })
}