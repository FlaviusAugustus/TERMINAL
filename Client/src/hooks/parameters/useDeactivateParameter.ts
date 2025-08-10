import { AxiosResponse } from "axios";
import apiClient from "@api/apiClient.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function deactivateParameter(id: string): Promise<AxiosResponse> {
  return await apiClient.post(`parameters/${id}/deactivate`);
}

/**
 * useDeactivateParameter Hook
 *
 * A custom hook for deleting a parameter.
 *
 * @hook
 */
export function useDeactivateParameter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deactivateParameter(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["parameters"] }),
  });
}
