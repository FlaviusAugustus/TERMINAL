import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";
import { TagsRequest, TagsResponse } from "@hooks/tags/useGetAllTags.ts";
import { Tag } from "@api/models/Tag.ts";

interface UpdateTagNameDto {
  id: string;
  name: string;
}

async function updateTagName({ id, name }: UpdateTagNameDto) {
  return await apiClient.patch(`tags/${id}`, { name });
}

/**
 * useUpdateTagName Hook
 *
 * A custom hook that provides functionality to update a tags's name.
 *
 * @hook
 * @param {UpdateTagNameDto} params - The parameters for the users request.
 */
export function useUpdateTagName({ pageSize, pageNumber }: TagsRequest) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateTagNameDto) => updateTagName(data),
    onSuccess: (_data, { id, name }) => {
      queryClient.setQueryData<Tag>(["tagDetails", id], (oldData) => {
        if (!oldData) return undefined;
        return {
          ...oldData,
          name: name,
        };
      });

      queryClient.setQueryData<TagsResponse>(
        ["tags", "all", { pageSize, pageNumber }],
        (oldData) => {
          if (!oldData) return undefined;
          return {
            ...oldData,
            rows: oldData.rows.map((tag) =>
              tag.id === id ? { ...tag, name } : tag
            ),
          };
        }
      );

      queryClient.invalidateQueries({ queryKey: ["tags", "all"] });
    },
  });
}
