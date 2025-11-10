import { keepPreviousData, useQuery } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";
import { Sample } from "@api/models/Sample";
import useIsOnline from "@hooks/useIsOnline";

export type SamplesRequest = {
  pageNumber: number;
  pageSize: number;
  orderBy?: string;
  desc?: boolean;
  searchPhrase?: string;
};

export type SamplesResponse = {
  rows: Sample[];
  pageAmount: number;
  rowsAmount: number;
};

function correctParams(params: SamplesRequest): SamplesRequest {
  function capitalizeFirstLetter(val: string | undefined) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  if (params.orderBy === "")
    return {
      searchPhrase: params.searchPhrase,
      pageNumber: params.pageNumber,
      pageSize: params.pageSize,
    };
  else {
    return {
      pageNumber: params.pageNumber,
      pageSize: params.pageSize,
      orderBy: capitalizeFirstLetter(params.orderBy),
      desc: params.desc,
    };
  }
}

async function fetchDataSamples(
  params: SamplesRequest
): Promise<SamplesResponse> {
  let samples;
  let rowsAmount;
  params = correctParams(params);
  if (params.searchPhrase) {
    samples = await apiClient.get("/samples/search", {
      params: {
        searchPhrase: params.searchPhrase,
        pageNumber: params.pageNumber,
        pageSize: params.pageSize,
        desc: params.desc,
      },
    });
    rowsAmount = samples.data.totalAmount;
    return {
      rows: samples.data.samples,
      pageAmount: Math.ceil(rowsAmount / params.pageSize),
      rowsAmount,
    };
  } else {
    samples = await apiClient.get("/samples", {
      params: {
        pageNumber: params.pageNumber,
        pageSize: params.pageSize,
        desc: params.desc,
      },
    });
    const amountOfSamples = await apiClient.get("/samples/amount");
    return {
      rows: samples.data.samples,
      pageAmount: Math.ceil(amountOfSamples.data / params.pageSize),
      rowsAmount: amountOfSamples.data,
    };
  }
}

/**
 * useSamples Hook
 *
 * A custom hook that fetches samples data from the API.
 * It returns the samples data for the given parameters, or keeps previous data while loading new data.
 *
 * @hook
 * @param {SamplesRequest} params - The parameters for the samples request.
 */
export function useSamples(params: SamplesRequest) {
  const online = useIsOnline();
  return useQuery({
    queryKey: ["samples", params],
    queryFn: () => fetchDataSamples(params),
    placeholderData: keepPreviousData,
    enabled: online,
  });
}
