import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";
import { AxiosResponse } from "axios";
import { sampleToUpdateRequest } from "utils/mapUtils";
import { SampleDetailsDto, UpdateSample } from "@api/models/Sample";

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
    mutationFn: (sample: SampleDetailsDto) =>
      editSample(sampleToUpdateRequest(sample)),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(["sampleDetails", variables.id], () => {
        return {
          ...variables,
        } satisfies SampleDetailsDto;
      });
    },
  });
}

export default useEditSample;
