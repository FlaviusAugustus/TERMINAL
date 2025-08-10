import apiClient from "@api/apiClient";
import { useMutation } from "@tanstack/react-query";
import { TagCreateRequest } from "@api/models/Tag.ts";

async function addTag(tag: TagCreateRequest) {
  const result = await apiClient.post("/tags", tag);
  return result;
}

function useAddProject() {
  return useMutation({
    mutationKey: ["addTag"],
    mutationFn: (tag: TagCreateRequest) => addTag(tag),
  });
}

export default useAddProject;
