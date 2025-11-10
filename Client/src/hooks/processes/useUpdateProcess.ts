import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";
import { AxiosResponse } from "axios";
import { sampleToUpdateRequest } from "utils/mapUtils";
import { ProcessDetailsDto, UpdateProcess } from "@api/models/Process.ts";

async function editProcess(process: UpdateProcess): Promise<AxiosResponse> {
  return await apiClient.patch(`process/${process.id}`, { ...process });
}

/**
 * useEditSample Hook
 *
 * A custom hook for updating a sample.
 *
 * @hook
 */
export function useEditProcess() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sample: ProcessDetailsDto) =>
      editProcess(sampleToUpdateRequest(sample)),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(["processDetails", variables.id], () => {
        return {
          ...variables,
        } satisfies ProcessDetailsDto;
      });
    },
  });
}

export default useEditProcess;
