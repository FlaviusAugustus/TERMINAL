import {SampleDetailsDto} from "@api/terminalSchemas.ts";
import apiClient from "@api/apiClient.ts";
import {keepPreviousData, useQuery} from "@tanstack/react-query";

async function fetchDataSampleDetails(id: string | null): Promise<SampleDetailsDto>{
    if (id === null) return { id: "",
        code: "",
        createdAtUtc: new Date(),
        comment: "",
        projectId: ""
    };
    return (await apiClient.get(`/samples/${id}`)).data;
}

export function useSampleDetails(id: string | null){
    return useQuery({
        queryKey: ['sampleDetails', id],
        queryFn: () => fetchDataSampleDetails(id),
        placeholderData: keepPreviousData,
    })
}