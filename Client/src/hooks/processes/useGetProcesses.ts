import { keepPreviousData, useQuery } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";
import useIsOnline from "@hooks/useIsOnline";
import { Process } from "@api/models/Process.ts";

export type ProcessesRequest = {
  pageNumber: number;
  pageSize: number;
  orderBy?: string;
  desc?: boolean;
  searchPhrase?: string;
};

export type ProcessesResponse = {
  rows: Process[];
  pageAmount: number;
  rowsAmount: number;
};

function correctParams(params: ProcessesRequest): ProcessesRequest {
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

async function fetchDataProcesses(
  params: ProcessesRequest
): Promise<ProcessesResponse> {
  let processes;
  let rowsAmount;
  params = correctParams(params);
  if (params.searchPhrase) {
    processes = await apiClient.get("/process/search", {
      params: {
        searchPhrase: params.searchPhrase,
        pageNumber: params.pageNumber,
        pageSize: params.pageSize,
        desc: params.desc,
      },
    });
    rowsAmount = processes.data.totalAmount;
    return {
      rows: processes.data.samples,
      pageAmount: Math.ceil(rowsAmount / params.pageSize),
      rowsAmount,
    };
  } else {
    processes = await apiClient.get("/process", {
      params: {
        pageNumber: params.pageNumber,
        pageSize: params.pageSize,
        desc: params.desc,
      },
    });
    const amountOfSamples = await apiClient.get("/process/amount");
    return {
      rows: processes.data.processes,
      pageAmount: Math.ceil(amountOfSamples.data / params.pageSize),
      rowsAmount: amountOfSamples.data,
    };
  }
}

/**
 * useSamples Hook
 *
 * A custom hook that fetches processes data from the API.
 * It returns the processes data for the given parameters, or keeps previous data while loading new data.
 *
 * @hook
 * @param {ProcessesRequest} params - The parameters for the processes request.
 */
export function useProcesses(params: ProcessesRequest) {
  const online = useIsOnline();
  return useQuery({
    queryKey: ["processes", params],
    queryFn: () => fetchDataProcesses(params),
    placeholderData: keepPreviousData,
    enabled: online,
  });
}
