import apiClient from "@api/apiClient.ts";
import { ParameterResponse } from "@api/models/Parameters.ts";
import useIsOnline from "@hooks/useIsOnline";
import { useQuery } from "@tanstack/react-query";

async function fetchAllParameters(): Promise<ParameterResponse> {
  const result = await apiClient.get<ParameterResponse>("/parameters/all");
  return result.data;
}

/**
 * useGetParameters Hook
 *
 * A custom hook that fetches parameters from the API.
 *
 * @hook
 */
function useGetAllParameters() {
  const online = useIsOnline();
  return useQuery({
    queryKey: ["allParameters"],
    queryFn: fetchAllParameters,
    enabled: online,
  });
}

export default useGetAllParameters;
