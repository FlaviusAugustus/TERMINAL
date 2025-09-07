import { keepPreviousData, useQuery } from "@tanstack/react-query";
import apiClient from "@api/apiClient";
import { Sample } from "@api/models/Sample";

export type SamplesParams = {
    pageNumber: number;
    pageSize: number;
    orderBy?: string;
    desc?: boolean;
};

export type SamplesResponse = {
    rows: Sample[];
    pageAmount: number;
    rowsAmount: number; // All rows (samples)
};

function correctParams(params: SamplesParams): SamplesParams {
    function capitalizeFirstLetter(val: string | undefined) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    if (params.orderBy === "") {
        return { pageNumber: params.pageNumber, pageSize: params.pageSize };
    } else {
        return {
            pageNumber: params.pageNumber,
            pageSize: params.pageSize,
            orderBy: capitalizeFirstLetter(params.orderBy),
            desc: params.desc,
        };
    }
}

async function fetchDataSamples(params: SamplesParams): Promise<SamplesResponse> {
    params = correctParams(params);
    const resultSamples = await apiClient.get(`/samples`, { params });
    const resultAmountOfSamples = await apiClient.get(`/samples/amount`);

    return {
        rows: resultSamples.data.samples,
        pageAmount: Math.ceil(resultAmountOfSamples.data / params.pageSize),
        rowsAmount: resultAmountOfSamples.data,
    };
}

/**
 * useSamples Hook
 *
 * A custom hook that fetches samples data from the API.
 * It returns the samples data for the given parameters, or keeps previous data while loading new data.
 *
 * @hook
 * @param {SamplesParams} params - The parameters for the samples request.
 */
export function useSamples(params: SamplesParams) {
    return useQuery({
        queryKey: ["samples", params],
        queryFn: () => fetchDataSamples(params),
        placeholderData: keepPreviousData,
    });
}