import apiClient from "@api/apiClient";
import { useMutation } from "@tanstack/react-query";
import { CreateProcess } from "@api/models/Process.ts";

async function addProcess(process: CreateProcess) {
  return await apiClient.post("/process", process);
}

/**
 * useAddRecipe Hook
 *
 * A custom hook that provides a mutation function to add a new recipe.
 *
 * @hook
 */
function useAddProcess() {
  return useMutation({
    mutationKey: ["addProcess"],
    mutationFn: (process: CreateProcess) => addProcess(process),
  });
}

export default useAddProcess;
