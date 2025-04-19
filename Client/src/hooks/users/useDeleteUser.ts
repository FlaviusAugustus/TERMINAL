import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";
import { UsersRequest, UsersResponse } from "@hooks/users/useGetUsers.ts";

async function deleteUser(id: string) {
    return await apiClient.delete(`users/${id}`);
}

export function useDeleteUser(params: UsersRequest, setUserDetailsId: (id: string | null) => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteUser(id),
        onSuccess: (_data, id) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            queryClient.invalidateQueries(['userDetails', id]);
            setUserDetailsId(null);

            queryClient.setQueryData(['users', params], (users: UsersResponse | undefined): UsersResponse | undefined => {
                if (!users) return undefined;
                return {
                    ...users,
                    rows: users.rows.filter((user) => user.id !== id),
                };
            });
        },
    });
}