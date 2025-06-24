import apiClient from "@api/apiClient";
import { CreateProjectRequest } from "@api/models/Project";
import { useMutation } from "@tanstack/react-query";

async function addProject(project: CreateProjectRequest) {
  const result = await apiClient.post("/projects", project);

  return result;
}

function useAddProject() {
  return useMutation({
    mutationKey: ["addProject"],
    mutationFn: (project: CreateProjectRequest) => addProject(project),
  });
}

export default useAddProject;
