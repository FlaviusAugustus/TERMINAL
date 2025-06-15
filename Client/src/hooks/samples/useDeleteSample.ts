import {useMutation, useQueryClient} from "@tanstack/react-query";
import {SamplesRequest} from "@hooks/samples/useGetSamples.ts";
import apiClient from "@api/apiClient.ts";
import {AxiosResponse} from "axios";

async function deleteSample(id: string | undefined): Promise<AxiosResponse> {
    return await apiClient.delete(`samples/${id}`);
}

/**
 * useDeleteSample Hook
 *
 * A custom hook for deleting a sample.
 *
 * @hook
 * @param {SamplesRequest} params - The parameters for the samples request.
 */
export function useDeleteSample(params: SamplesRequest) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteSample(id),
        onSuccess: (_data, variables) => {
            queryClient.setQueryData(['sampleDetails', variables], (() => null))
            queryClient.invalidateQueries({queryKey: ['samples', params]})
        }
    });
}