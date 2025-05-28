import {useMutation, useQueryClient} from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";
import {AxiosResponse} from "axios";
import {ProjectsRequest, ProjectsResponse} from "@hooks/projects/useGetProjects.ts";

async function deleteProject(id: string | undefined): Promise<AxiosResponse> {
    return await apiClient.delete(`projects/${id}`);
}

export function useDeleteProject(params: ProjectsRequest) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteProject(id),
        onSuccess: (_data, variables) => {
            queryClient.setQueryData(['projectDetails', variables], (() => null))
            queryClient.setQueryData(['projects', params], ((projects: ProjectsResponse): ProjectsResponse =>
                    (
                        {
                            ...projects,
                            rows: projects.rows.filter((row) => row.id !== variables)
                        }
                    )
            ))
        }
    });
}