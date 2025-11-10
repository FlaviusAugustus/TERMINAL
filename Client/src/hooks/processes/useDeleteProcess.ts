import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProcessesRequest } from "@hooks/processes/useGetProcesses.ts";
import apiClient from "@api/apiClient.ts";
import { AxiosResponse } from "axios";

async function deleteProcess(id: string | undefined): Promise<AxiosResponse> {
  return await apiClient.delete(`process/${id}`);
}

/**
 * useDeleteSample Hook
 *
 * A custom hook for deleting a sample.
 *
 * @hook
 * @param {ProcessesRequest} params - The parameters for the processes request.
 */
export function useDeleteProcess(params: ProcessesRequest) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProcess(id),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(["processDetails", variables], () => null);
      queryClient.invalidateQueries({ queryKey: ["processes", params] });
    },
  });
}
