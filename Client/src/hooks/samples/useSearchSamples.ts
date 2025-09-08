import { useQuery } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";
import { SampleDto } from "@api/models/SampleDto.ts";

export type SamplesSearchParams = {
  searchPhrase: string;
  pageNumber: number;
  pageSize: number;
};

export type SampleSearchResult = {
  rows: SampleDto[];
  pageAmount: number;
  rowsAmount: number;
};

async function fetchSamples(
  params: SamplesSearchParams
): Promise<SampleSearchResult> {
  const response = await apiClient.get("/samples/search", { params });
  return {
    rows: response.data.samples,
    pageAmount: Math.ceil(response.data.totalAmount / params.pageSize),
    rowsAmount: response.data.totalAmount,
  };
}

/**
 * useSearchSamples Hook
 *
 * A custom hook that fetches sample data based on a search phrase.
 * It returns the sample data for the given search parameters.
 *
 * @hook
 * @param {SamplesSearchParams} params - The parameters for the samples search request.
 */
export function useSearchSamples(params: SamplesSearchParams) {
  return useQuery({
    queryKey: ["samplesSearch", params],
    queryFn: () => fetchSamples(params),
    enabled: !!params.searchPhrase,
  });
}
