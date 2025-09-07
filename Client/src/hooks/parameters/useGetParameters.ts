import apiClient from "@api/apiClient.ts";
import {
  AllParameters,
  DecimalParameter,
  IntegerParameter,
  TextParameter,
} from "@api/models/Parameters";
import { useQuery } from "@tanstack/react-query";

type ParameterResponse = { parameters: AllParameters[] };

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
export type {
  IntegerParameter,
  DecimalParameter,
  TextParameter,
  AllParameters,
};
