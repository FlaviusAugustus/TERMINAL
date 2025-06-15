import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";
import { UsersRequest } from "@hooks/users/useGetUsers.ts";

async function deleteUser(id: string) {
    return await apiClient.delete(`users/${id}`);
}

/**
 * useDeleteUser Hook
 *
 * A custom hook that provides functionality to delete a user.
 *
 * @hook
 * @param {UsersRequest} params - The parameters for the users request.
 */
export function useDeleteUser(params: UsersRequest) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteUser(id),
        onSuccess: (_data, id) => {
            queryClient.setQueryData(['userDetails', id], () => null)
            queryClient.invalidateQueries({queryKey: ['users', params]})
        }
    });
}