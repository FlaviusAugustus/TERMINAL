import { keepPreviousData, useQuery } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";

async function fetchTagAmount(): Promise<number> {
  const amount = await apiClient.get("/tags/amount");
  return amount.data;
}

/**
 * useGetAmountTags Hook
 *
 * Fetches an amount of tags.
 *
 * @hook
 */
export function useGetTagAmount() {
  return useQuery({
    queryKey: ["tags", "amount"],
    queryFn: () => fetchTagAmount(),
    placeholderData: keepPreviousData,
  });
}
