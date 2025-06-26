import apiClient from "@api/apiClient.ts";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {Tag} from "@api/models/Tag.ts";

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

async function fetchDataProject(
  params: TagsRequest,
): Promise<TagsResponse> {
    const tags = await apiClient.get("/tags/all", {params});
    const amountOfTags = await apiClient.get("/tags/amount");
    return {
        rows: tags.data.tags,
        pageAmount: Math.ceil(amountOfTags.data / params.pageSize),
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
export function useGetAllTags(params: TagsRequest) {
    return useQuery({
        queryKey: ["tags", params],
        queryFn: () => fetchDataProject(params),
        placeholderData: keepPreviousData,
    });
}
