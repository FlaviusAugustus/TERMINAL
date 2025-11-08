import apiClient from "@api/apiClient";
import { useMutation } from "@tanstack/react-query";
import { CreateSample } from "@api/models/Process.ts";

async function addSample(sample: CreateSample) {
  return await apiClient.post("/samples", sample);
}

/**
 * useAddRecipe Hook
 *
 * A custom hook that provides a mutation function to add a new recipe.
 *
 * @hook
 */
function useAddRecipe() {
  return useMutation({
    mutationKey: ["addSample"],
    mutationFn: (sample: CreateSample) => addSample(sample),
  });
}

export default useAddRecipe;
