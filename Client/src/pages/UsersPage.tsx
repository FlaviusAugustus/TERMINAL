import Users from "@components/Users/Users.tsx";
import { useState } from "react";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { useUsers } from "@hooks/users/useGetUsers.ts";
import UserDetails from "@components/Users/UserDetails.tsx";
import { useUserDetails } from "@hooks/users/useGetUserDetails.ts";
import { useDeleteUser } from "@hooks/users/useDeleteUser.ts";

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

    const mutation = useDeleteUser(
        {
            pageNumber: pagination.pageIndex,
            pageSize: pagination.pageSize,
            orderBy: sorting[0]?.id ?? "",
            desc: sorting[0]?.desc ?? true,
        },
        setUserDetailsId
    );

    const dataQueryUserDetails = useUserDetails(userDetailsId);

    const changeUserDetails = (userId: string) => {
        setUserDetailsId(userId);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex justify-center p-5 flex-wrap">
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
                <div className="flex-1 bg-white p-3 rounded-md m-1 self-start">
                    {dataQueryUserDetails.isLoading ? (
                        <div className="flex justify-center">
                            <span className="loading loading-spinner loading-md"></span>
                        </div>
                    ) : userDetailsId && dataQueryUserDetails.data ? (
                        <UserDetails
                            dataQuery={dataQueryUserDetails.data}
                            mutation={mutation}
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