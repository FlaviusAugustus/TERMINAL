import {useMutation, useQueryClient} from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";
import {ProjectDetailsDto} from "@api/terminalSchemas.ts";
import {ProjectsRequest, ProjectsResponse} from "@hooks/projects/useGetProjects.ts";

interface UpdateProjectNameDto {
    id: string;
    name: string;
}

async function updateProjectName({id, name} : UpdateProjectNameDto) {
    return await apiClient.patch(`projects/${id}`, { name });
}

/**
 * useUpdateProjectName Hook
 *
 * A custom hook that provides functionality to update a project's name.
 *
 * @hook
 * @param {UpdateProjectNameDto} params - The parameters for the users request.
 */
export function useUpdateProjectName(params: ProjectsRequest) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateProjectNameDto) => updateProjectName(data),
        onSuccess: (_data, { id, name }) => {
            queryClient.setQueryData<ProjectDetailsDto>(['projectDetails', id], (oldData) => {
                if (!oldData) return undefined;
                return {
                    ...oldData,
                    name: name,
                };
            });

            queryClient.setQueryData<ProjectsResponse>(['projects', 'all',  params], (oldData) => {
                if (!oldData) return undefined;
                return {
                    ...oldData,
                    rows: oldData.rows.map((project) =>
                        project.id === id ? { ...project, name } : project
                    ),
                };
            });
        }
    })
}