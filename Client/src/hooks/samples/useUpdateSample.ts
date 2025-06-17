import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";
import { AxiosResponse } from "axios";
import { UpdateSampleRequest } from "@api/terminalSchemas";

async function editSample(sample: UpdateSampleRequest): Promise<AxiosResponse> {
  return await apiClient.patch(`samples/${sample.id}`, { ...sample });
}

/**
 * useEditSample Hook
 *
 * A custom hook for updating a sample.
 *
 * @hook
 */
export function useEditSample() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sample: UpdateSampleRequest) => editSample(sample),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["sampleDetails", variables.id],
      });
    },
  });
}

export default useEditSample;
