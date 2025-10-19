import apiClient from "@api/apiClient.ts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Tag } from "@api/models/Tag.ts";

export type TagsRequest = {
  pageNumber: number;
  pageSize: number;
  desc?: boolean;
  searchPhrase?: string;
};

export type TagsResponse = {
  rows: Tag[];
  pageAmount: number;
  rowsAmount: number;
};

async function fetchDataTag(params: TagsRequest): Promise<TagsResponse> {
  let tags;
  let rowsAmount;
  if (params.searchPhrase) {
    tags = await apiClient.get("/tags/search", { params });
    rowsAmount = tags.data.totalAmount;
    return {
      rows: tags.data.tags,
      pageAmount: Math.ceil(rowsAmount / params.pageSize),
      rowsAmount,
    };
  } else {
    tags = await apiClient.get("/tags/all", {
      params: {
        pageNumber: params.pageNumber,
        pageSize: params.pageSize,
        desc: params.desc,
      },
    });
    const amountOfTags = await apiClient.get("/tags/amount");
    return {
      rows: tags.data.tags,
      pageAmount: Math.ceil(amountOfTags.data / params.pageSize),
      rowsAmount: amountOfTags.data,
    };
  }
}

export function useGetAllTags({ pageSize, pageNumber }: TagsRequest) {
  return useQuery({
    queryKey: [
      "tags",
      "all",
      {
        pageSize,
        pageNumber,
      },
    ],
    queryFn: () => fetchDataTag({ pageSize, pageNumber }),
    placeholderData: keepPreviousData,
  });
}
