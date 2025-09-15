import { useQuery } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";
import { Tag } from "@api/models/Tag";

export type TagsSearchParams = {
  searchPhrase: string;
  pageNumber: number;
  pageSize: number;
};

export type TagSearchResult = {
  rows: Tag[];
  pageAmount: number;
  rowsAmount: number;
};

async function fetchTags(params: TagsSearchParams): Promise<TagSearchResult> {
  const response = await apiClient.get("/tags/search", { params });
  return {
    rows: response.data.tags,
    pageAmount: Math.ceil(response.data.totalAmount / params.pageSize),
    rowsAmount: response.data.totalAmount,
  };
}

/**
 * useSearchTags Hook
 *
 * A custom hook that fetches tags data based on a search phrase.
 * It returns the tags data for the given search parameters.
 *
 * @hook
 * @param {TagsSearchParams} params - The parameters for the tag search request.
 */
export function useSearchTags(params: TagsSearchParams) {
  return useQuery({
    queryKey: ["tagsSearch", params],
    queryFn: () => fetchTags(params),
    enabled: !!params.searchPhrase,
  });
}
