import Users from "@components/Users/Users.tsx";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { useUsers } from "@hooks/users/useGetUsers.ts";
import UserDetails from "@components/Users/UserDetails.tsx";
import { useUserDetails } from "@hooks/users/useGetUserDetails.ts";
import {useDeleteUser} from "@hooks/users/useDeleteUser.ts";
import {toastPromise} from "../utils/toast.utils.tsx";
import {useUpdateUserEmail} from "@hooks/users/useUpdateUserEmail.ts";
import {useUpdateUserRole} from "@hooks/users/useUpdateUserRole.ts";
import {useState} from "react";

const UsersPage = () => {
    const [userDetailsId, setUserDetailsId] = useState<string | null>(null);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const dataQueryUsers = useUsers({
        pageNumber: pagination.pageIndex,
        pageSize: pagination.pageSize,
        desc: sorting[0]?.desc ?? true,
    });

    const dataQueryUserDetails = useUserDetails(userDetailsId);

    const deleteMutation = useDeleteUser({
        pageNumber: pagination.pageIndex,
        pageSize: pagination.pageSize,
        desc: sorting[0]?.desc ?? true,
    })

    const updateEmailMutation = useUpdateUserEmail({
        pageNumber: pagination.pageIndex,
        pageSize: pagination.pageSize,
        desc: sorting[0]?.desc ?? true,
    });

    const updateRoleMutation = useUpdateUserRole({
        pageNumber: pagination.pageIndex,
        pageSize: pagination.pageSize,
        desc: sorting[0]?.desc ?? true,
    });

    const handleDeletion = async (id: string) => {
        try {
            await toastPromise(
                deleteMutation.mutateAsync(id),
                {
                    success: "User deleted successfully",
                    error: "Failed to delete user",
                    loading: "Deleting user...",
                }
            );
        } catch {
            // Error is already handled by the toastPromise
        }
    };

    const handleSubmit = async (id: string, email: string, role: string) => {
        try {
            if (dataQueryUserDetails.data?.email !== email) {
                await toastPromise(
                    updateEmailMutation.mutateAsync({ id, email }),
                    {
                        success: "Email updated successfully",
                        error: "Failed to update email",
                        loading: "Updating email...",
                    }
                );
            }

            if (dataQueryUserDetails.data?.role !== role) {
                await toastPromise(
                    updateRoleMutation.mutateAsync({ id, role }),
                    {
                        success: "Role updated successfully",
                        error: "Failed to update role",
                        loading: "Updating role...",
                    }
                );
            }
        } catch {
            // Error is already handled by the toastPromise
        }
    }

    const changeUserDetails = (userId: string) => {
        setUserDetailsId(userId);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex flex-wrap sm:flex-nowrap  justify-center p-5">
                <div className="flex-1 bg-white p-3 rounded-md m-1">
                    {dataQueryUsers.isLoading ? (
                        <div className="flex justify-center">
                            <span className="loading loading-spinner loading-md"></span>
                        </div>
                    ) : (
                        <Users
                            dataQuery={dataQueryUsers.data}
                            sorting={sorting}
                            setSorting={setSorting}
                            pagination={pagination}
                            setPagination={setPagination}
                            onChangeUserDetails={changeUserDetails}
                        />
                    )}
                </div>
                <div className="flex-1 bg-white rounded-md m-1 self-start">
                    {userDetailsId && dataQueryUserDetails.data ? (
                        <UserDetails
                            dataQuery={dataQueryUserDetails.data}
                            onDeleted={handleDeletion}
                            onSubmit={handleSubmit}
                        />
                    ) : (
                        <div className="text-center text-gray-500">Select a user to view details</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UsersPage;