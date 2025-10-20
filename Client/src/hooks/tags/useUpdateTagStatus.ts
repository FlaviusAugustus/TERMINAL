import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";
import { TagsRequest, TagsResponse } from "@hooks/tags/useGetAllTags.ts";
import { TagDetailsDto } from "@api/models/Tag.ts";

interface UpdateTagStatusDto {
  id: string;
  isActive: boolean;
}

async function updateTagStatus({ id, isActive }: UpdateTagStatusDto) {
  if (isActive) return await apiClient.post(`tags/${id}/activate`);
  return await apiClient.post(`tags/${id}/deactivate`);
}

/**
 * useUpdateTagStatus Hook
 *
 * A custom hook that provides functionality to update a tag's status.
 *
 * @hook
 * @param {UpdateTagStatusDto} params - The parameters for the users request.
 */
export function useUpdateTagStatus({ pageSize, pageNumber }: TagsRequest) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateTagStatusDto) => updateTagStatus(data),
    onSuccess: (_data, { id, isActive }) => {
      queryClient.setQueryData<TagDetailsDto>(["tagDetails", id], (oldData) => {
        if (!oldData) return undefined;
        return {
          ...oldData,
          isActive: isActive,
        };
      });

      queryClient.setQueryData<TagsResponse>(
        ["tags", "all", { pageSize, pageNumber }],
        (oldData) => {
          if (!oldData) return undefined;
          return {
            ...oldData,
            rows: oldData.rows.map((project) =>
              project.id === id ? { ...project, isActive } : project
            ),
          };
        }
      );
    },
  });
}
