import apiClient from "@api/apiClient.ts";
import { useQuery } from "@tanstack/react-query";

type ParameterType = "decimal" | "text" | "integer";

type ParameterValue<T> = {
  value: T;
  defaultValue: number;
};

type Parameter = {
  $type: ParameterType;
  step: number;
  id: string;
  name: string;
  order: number;
  parentId: string;
};

type NumericParameter = Parameter & {
  $type: "decimal" | "integer";
  unit: string;
};

type IntegerParameter = NumericParameter &
  ParameterValue<number> & {
    $type: "integer";
  };

type DecimalParameter = NumericParameter &
  ParameterValue<number> & {
    $type: "decimal";
  };

type TextParameter = Parameter &
  ParameterValue<string> & {
    $type: "text";
    allowedValues: string[];
  };

type AllParameters = IntegerParameter | DecimalParameter | TextParameter;

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
