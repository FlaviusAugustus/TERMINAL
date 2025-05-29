import apiClient from "@api/apiClient";
import { usePrefetchQuery, useQuery } from "@tanstack/react-query";

const queryArg = {
  queryKey: ["amount", "samples"],
  queryFn: async () => await apiClient.get<number>("/samples/amount"),
};

function useGetSampleAmount() {
  return useQuery(queryArg);
}

function usePrefetchSampleAmount() {
  return usePrefetchQuery(queryArg);
}
export { useGetSampleAmount, usePrefetchSampleAmount };
