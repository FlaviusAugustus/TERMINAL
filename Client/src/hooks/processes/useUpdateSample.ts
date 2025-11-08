import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";
import { AxiosResponse } from "axios";
import { sampleToUpdateRequest } from "utils/mapUtils";
import { ProcessDetailsDto, UpdateSample } from "@api/models/Process.ts";

async function editSample(sample: UpdateSample): Promise<AxiosResponse> {
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
    mutationFn: (sample: ProcessDetailsDto) =>
      editSample(sampleToUpdateRequest(sample)),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(["sampleDetails", variables.id], () => {
        return {
          ...variables,
        } satisfies ProcessDetailsDto;
      });
    },
  });
}

export default useEditSample;
