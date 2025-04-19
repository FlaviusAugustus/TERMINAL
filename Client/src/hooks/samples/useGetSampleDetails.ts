import {SampleDetailsDto} from "@api/terminalSchemas.ts";
import apiClient from "@api/apiClient.ts";
import {keepPreviousData, useQuery} from "@tanstack/react-query";

async function fetchDataSampleDetails(id: string | null): Promise<SampleDetailsDto>{
    return (await apiClient.get(`/samples/${id}`)).data;
}

export function useSampleDetails(id: string | null){
    return useQuery({
        queryKey: ['sampleDetails', id],
        queryFn: () => fetchDataSampleDetails(id),
        placeholderData: keepPreviousData,
        enabled: (id !== null)
    })
}