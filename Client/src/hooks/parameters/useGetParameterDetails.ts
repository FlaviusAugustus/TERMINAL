import apiClient from "@api/apiClient.ts";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {AllParameterDetails} from "@api/models/ParameterDetails.ts";

async function fetchParameterDetails(id: string | null): Promise<AllParameterDetails> {
    return (await apiClient.get(`/parameters/${id}`)).data;
}

export function useGetParameterDetails(id: string | null) {
    return useQuery({
        queryKey: ['parameterDetails', id],
        queryFn: () => fetchParameterDetails(id),
        placeholderData: keepPreviousData,
        enabled: (id !== null)
    })
}