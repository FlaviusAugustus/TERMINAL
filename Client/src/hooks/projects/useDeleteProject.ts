import {useMutation, useQueryClient} from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";
import {AxiosResponse} from "axios";
import {ProjectsRequest} from "@hooks/projects/useGetProjects.ts";

async function deleteProject(id: string | undefined): Promise<AxiosResponse> {
    return await apiClient.delete(`projects/${id}`);
}

/**
 * useDeleteProject Hook
 *
 * A custom hook that provides functionality to delete a project.
 *
 * @hook
 * @param {ProjectsRequest} params - The parameters for the projects request.
 */
export function useDeleteProject(params: ProjectsRequest) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteProject(id),
        onSuccess: (_data, variables) => {
            queryClient.setQueryData(['projectDetails', variables], (() => null))
            queryClient.invalidateQueries({queryKey: ['projects', 'all', params]})
        }
    });
}