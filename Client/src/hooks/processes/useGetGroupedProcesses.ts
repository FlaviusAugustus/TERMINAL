import apiClient from "@api/apiClient.ts";
import useIsOnline from "@hooks/useIsOnline";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export type Grouped = {
  date: string;
  amount: number;
};

async function fetchGroupedProcesses(days: number): Promise<Grouped[]> {
  return (
    await apiClient.get(`/process/grouped-by-days`, {
      params: { days: days },
    })
  ).data;
}

/**
 * useGroupedProcesses Hook
 *
 * A custom hook that fetches grouped processes by days.
 *
 * @hook
 */
export function useGroupedProcesses(days: number) {
  const online = useIsOnline();
  return useQuery({
    queryKey: ["groupedProcesses", days],
    queryFn: () => fetchGroupedProcesses(days),
    placeholderData: keepPreviousData,
    enabled: days !== null && online,
  });
}
