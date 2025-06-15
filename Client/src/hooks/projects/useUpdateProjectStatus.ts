import {useMutation, useQueryClient} from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";
import {ProjectDetailsDto} from "@api/terminalSchemas.ts";
import {ProjectsRequest, ProjectsResponse} from "@hooks/projects/useGetProjects.ts";

interface UpdateProjectStatusDto {
    id: string;
    isActive: boolean;
}

async function updateProjectStatus({id, isActive} : UpdateProjectStatusDto) {
    if(isActive) return await apiClient.post(`projects/${id}/activate`);
    return await apiClient.post(`projects/${id}/deactivate`);
}

/**
 * useUpdateProjectStatus Hook
 *
 * A custom hook that provides functionality to update a project's status.
 *
 * @hook
 * @param {UpdateProjectStatusDto} params - The parameters for the users request.
 */
export function useUpdateProjectStatus(params: ProjectsRequest) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateProjectStatusDto) => updateProjectStatus(data),
        onSuccess: (_data, { id, isActive }) => {
            queryClient.setQueryData<ProjectDetailsDto>(['projectDetails', id], (oldData) => {
                if (!oldData) return undefined;
                return {
                    ...oldData,
                    isActive: isActive,
                };
            });

            queryClient.setQueryData<ProjectsResponse>(['projects', 'all',  params], (oldData) => {
                if (!oldData) return undefined;
                return {
                    ...oldData,
                    rows: oldData.rows.map((project) =>
                        project.id === id ? { ...project, isActive } : project
                    ),
                };
            });
        }
    })
}