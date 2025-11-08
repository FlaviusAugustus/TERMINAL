import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProcessesRequest } from "@hooks/processes/useGetProcesses.ts";
import apiClient from "@api/apiClient.ts";
import { AxiosResponse } from "axios";

async function deleteSample(id: string | undefined): Promise<AxiosResponse> {
  return await apiClient.delete(`samples/${id}`);
}

/**
 * useDeleteSample Hook
 *
 * A custom hook for deleting a sample.
 *
 * @hook
 * @param {ProcessesRequest} params - The parameters for the processes request.
 */
export function useDeleteSample(params: ProcessesRequest) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteSample(id),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(["sampleDetails", variables], () => null);
      queryClient.invalidateQueries({ queryKey: ["samples", params] });
    },
  });
}
