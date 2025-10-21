import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";
import { AxiosResponse } from "axios";
import { TagsRequest } from "@hooks/tags/useGetAllTags.ts";

async function deleteTag(id: string | undefined): Promise<AxiosResponse> {
  return await apiClient.delete(`tags/${id}`);
}

/**
 * useDeleteTag Hook
 *
 * A custom hook that provides functionality to delete a tag.
 *
 * @hook
 * @param {TagsRequest} params - The parameters for the projects request.
 */
export function useDeleteTag({ pageSize, pageNumber }: TagsRequest) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTag(id),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(["tagDetails", variables], () => null);
      queryClient.invalidateQueries({
        queryKey: ["tags", "all", { pageSize, pageNumber }],
      });
    },
  });
}
