import { AllParametersRequest } from "@api/models/Parameters.ts";
import apiClient from "@api/apiClient.ts";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@utils/queryClient.tsx";

async function addParameter(parameterRequest: AllParametersRequest) {
  if (parameterRequest.$type == "text")
    return await apiClient.post("/parameters/define/text", {
      name: parameterRequest.name,
      allowedValues: parameterRequest.allowedValues,
    });
  else if (parameterRequest.$type == "decimal")
    return await apiClient.post("/parameters/define/decimal", {
      name: parameterRequest.name,
      unit: parameterRequest.unit,
      step: parameterRequest.step,
    });
  else
    return await apiClient.post("/parameters/define/integer", {
      name: parameterRequest.name,
      unit: parameterRequest.unit,
      step: parameterRequest.step,
    });
}

/**
 * useAddParameter Hook
 *
 * A custom hook that provides a mutation function to add a new parameter.
 *
 * @hook
 */
export function useAddParameter() {
  return useMutation({
    mutationKey: ["addParameter"],
    mutationFn: (parameterRequest: AllParametersRequest) =>
      addParameter(parameterRequest),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["parameters"] }),
  });
}
