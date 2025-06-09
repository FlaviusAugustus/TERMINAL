import {SampleDto} from "@api/terminalSchemas.ts";
import apiClient from "@api/apiClient.ts";
import {useQuery} from "@tanstack/react-query";

export type SamplesSearchParams = {
    searchPhrase: string;
    pageNumber: number;
    pageSize: number;
}

export type SamplesSearchResponse = {
    rows: SampleDto[];
    rowsAmount: number;
}

async function fetchSamples(params: SamplesSearchParams): Promise<SamplesSearchResponse> {
    const resultSamples = await apiClient.get(`/samples/search`, {params});

    return {
        rows: resultSamples.data.samples,
        rowsAmount: resultSamples.data.rowsAmount,
    };
}

/**
 * useSearchSamples Hook
 *
 * A custom hook that fetches samples data based on a search phrase.
 * It returns the samples data for the given search parameters.
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