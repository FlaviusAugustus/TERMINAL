import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";
import { UsersRequest, UsersResponse } from "@hooks/users/useGetUsers.ts";

interface UpdateUserRoleDto {
    id: string;
    role: string;
}

interface UserDetails {
    id: string;
    email: string;
    role: string;
}

async function updateUserRole({id, role} : UpdateUserRoleDto) {
    return await apiClient.patch(`users/${id}/role`, { role });
}

export function useUpdateUserRole(params: UsersRequest) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateUserRoleDto) => updateUserRole(data),
        onSuccess: (_data, { id, role }) => {
            queryClient.setQueryData<UserDetails>(['userDetails', id], (oldData) => {
                if (!oldData) return undefined;
                return {
                    ...oldData,
                    role: role,
                };
            });

            queryClient.setQueryData<UsersResponse>(['users', params], (oldData) => {
                if (!oldData) return undefined;
                return {
                    ...oldData,
                    rows: oldData.rows.map((user) =>
                        user.id === id ? { ...user, role } : user
                    ),
                };
            });
        }
    })
}