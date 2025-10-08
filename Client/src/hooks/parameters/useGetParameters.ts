import apiClient from "@api/apiClient.ts";
import { ParameterResponse } from "@api/models/Parameters.ts";
import { useQuery } from "@tanstack/react-query";

async function fetchParameters(): Promise<ParameterResponse> {
  const result = await apiClient.get<ParameterResponse>("/parameters");
  return result.data;
}

/**
 * useGetParameters Hook
 *
 * A custom hook that fetches parameters from the API.
 *
 * @hook
 */
function useGetParameters() {
  return useQuery({
    queryKey: ["parameters"],
    queryFn: fetchParameters,
  });
}

export default useGetParameters;
