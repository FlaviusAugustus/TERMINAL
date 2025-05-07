import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";
import { UsersRequest, UsersResponse } from "@hooks/users/useGetUsers.ts";

interface UpdateUserEmailDto {
    id: string;
    email: string;
}

interface UserDetails {
    id: string;
    email: string;
    role: string;
}

async function updateUserEmail({id, email} : UpdateUserEmailDto) {
    return await apiClient.patch(`users/${id}/email`, { email });
}

export function useUpdateUserEmail(params: UsersRequest) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateUserEmailDto) => updateUserEmail(data),
        onSuccess: (_data, { id, email }) => {
            queryClient.setQueryData<UserDetails>(['userDetails', id], (oldData) => {
                if (!oldData) return undefined;
                return {
                    ...oldData,
                    email: email,
                };
            });

            queryClient.setQueryData<UsersResponse>(['users', params], (oldData) => {
                if (!oldData) return undefined;
                return {
                    ...oldData,
                    rows: oldData.rows.map((user) =>
                        user.id === id ? { ...user, email } : user
                    ),
                };
            });
        }
    })
}