import apiClient from "@api/apiClient";
import { usePrefetchQuery, useQuery } from "@tanstack/react-query";

const queryArg = {
  queryKey: ["amount", "projects"],
  queryFn: async () => await apiClient.get<number>("/projects/amount"),
};

function useGetProjectAmount() {
  return useQuery(queryArg);
}

function usePrefetchProjectAmount() {
  return usePrefetchQuery(queryArg);
}
export { useGetProjectAmount, usePrefetchProjectAmount };
