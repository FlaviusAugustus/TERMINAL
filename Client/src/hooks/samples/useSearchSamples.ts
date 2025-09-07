import { Sample } from "@api/models/Sample";
import apiClient from "@api/apiClient";
import { useQuery } from "@tanstack/react-query";

export type SamplesSearchParams = {
    searchPhrase: string;
    pageNumber: number;
    pageSize: number;
};

export type SamplesSearchResponse = {
    rows: Sample[];
    pageAmount: number;
    rowsAmount: number;
};

async function fetchSamples(
    params: SamplesSearchParams
): Promise<SamplesSearchResponse> {
    const resultSamples = await apiClient.get(`/samples/search`, { params });

    return {
        rows: resultSamples.data.samples,
        pageAmount: Math.ceil(resultSamples.data.totalAmount / params.pageSize),
        rowsAmount: resultSamples.data.totalAmount,
    };
}

/**
 * useSearchSamples Hook
 *
 * A custom hook that fetches sample data based on a search phrase.
 * It returns the sample data for the given search parameters.
 *
 * @hook
 */
export function useSearchSamples(params: SamplesSearchParams) {
    return useQuery({
        queryKey: ["samplesSearch", params],
        queryFn: () => fetchSamples(params),
        enabled: !!params.searchPhrase.trim(),
    });
}