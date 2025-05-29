import apiClient from "@api/apiClient";
import { usePrefetchQuery, useQuery } from "@tanstack/react-query";

const queryArg = {
  queryKey: ["amount", "users"],
  queryFn: async () => await apiClient.get<number>("/users/amount"),
};

function useGetUserAmount() {
  return useQuery(queryArg);
}

function usePrefetchUserAmount() {
  return usePrefetchQuery(queryArg);
}
export { useGetUserAmount, usePrefetchUserAmount };
