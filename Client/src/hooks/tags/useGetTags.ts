import apiClient from "@api/apiClient.ts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Tag } from "@api/models/Tag.ts";
import useIsOnline from "@hooks/useIsOnline";

export type TagsRequest = {
  pageNumber: number;
  pageSize: number;
  desc?: boolean;
};

export type TagsResponse = {
  rows: Tag[];
  pageAmount: number;
  rowsAmount: number;
};

async function fetchDataTag({
  pageSize,
  pageNumber,
}: TagsRequest): Promise<TagsResponse> {
  const tags = await apiClient.get("/tags", {
    params: { pageSize, pageNumber },
  });
  const amountOfTags = await apiClient.get("/tags/amount");
  return {
    rows: tags.data.tags,
    pageAmount: Math.ceil(amountOfTags.data / pageSize),
    rowsAmount: amountOfTags.data,
  };
}

/**
 * useGetAllTags Hook
 *
 * Fetches a list of tags based on the provided parameters.
 *
 * @hook
 * @param {TagsRequest} params - The parameters for the tags request.
 */
export function useGetTags({ pageSize, pageNumber }: TagsRequest) {
  const online = useIsOnline();
  return useQuery({
    queryKey: ["tags", "all", { pageSize, pageNumber }],
    queryFn: () => fetchDataTag({ pageSize, pageNumber }),
    placeholderData: keepPreviousData,
    enabled: online,
  });
}
