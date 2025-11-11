import { AxiosResponse } from "axios";
import apiClient from "@api/apiClient.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function activateParameter(id: string): Promise<AxiosResponse> {
  return await apiClient.post(`parameters/${id}/activate`);
}

/**
 * useActivateParameter Hook
 *
 * A custom hook for activate a parameter.
 *
 * @hook
 */
export function useActivateParameter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => activateParameter(id),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["parameters"],
      }),
  });
}
