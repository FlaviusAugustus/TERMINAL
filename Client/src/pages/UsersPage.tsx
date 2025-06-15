import Users from "@components/Users/Users.tsx";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { useUsers } from "@hooks/users/useGetUsers.ts";
import UserDetails from "@components/Users/UserDetails.tsx";
import { useUserDetails } from "@hooks/users/useGetUserDetails.ts";
import { useDeleteUser } from "@hooks/users/useDeleteUser.ts";
import { toastPromise } from "../utils/toast.utils.tsx";
import { useUpdateUserEmail } from "@hooks/users/useUpdateUserEmail.ts";
import { useUpdateUserRole } from "@hooks/users/useUpdateUserRole.ts";
import { useState } from "react";
import TableLayout from "./layouts/TableLayout.tsx";
import ComponentOrLoader from "@components/Shared/ComponentOrLoader.tsx";
import Loader from "@components/Shared/Loader.tsx";

const UsersPage = () => {
  const [userDetailsId, setUserDetailsId] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [detailsOpen, setDetailsOpen] = useState(false);

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
  });

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
    await toastPromise(
        deleteMutation.mutateAsync(id),
        {
          loading: 'Deleting user...',
          success: 'User deleted successfully',
          error: 'Failed to delete user'
        }
    );
  };

  const handleSubmit = async (id: string, email: string, role: string) => {
    if (dataQueryUserDetails.data?.email !== email) {
      await toastPromise(updateEmailMutation.mutateAsync({ id, email }), {
        success: "Email updated successfully",
        error: "Failed to update email",
        loading: "Updating email...",
      });
    }

    if (dataQueryUserDetails.data?.role !== role) {
      await toastPromise(updateRoleMutation.mutateAsync({ id, role }), {
        success: "Role updated successfully",
        error: "Failed to update role",
        loading: "Updating role...",
      });
    }
  };

  const editUser = (userId: string) => {
    setDetailsOpen(true);
    setUserDetailsId(userId);
  };

  return (
    <TableLayout>
      <ComponentOrLoader
        isLoading={dataQueryUsers.isLoading}
        loader={<Loader />}
      >
        <Users
          dataQuery={dataQueryUsers.data}
          sorting={sorting}
          setSorting={setSorting}
          pagination={pagination}
          setPagination={setPagination}
          onEdit={editUser}
          onDelete={handleDeletion}
          onChangePassword={() => {}}
        />
      </ComponentOrLoader>
      <ComponentOrLoader
        isLoading={dataQueryUserDetails.isLoading}
        loader={<Loader />}
      >
        <UserDetails
          open={detailsOpen}
          setOpen={setDetailsOpen}
          dataQuery={dataQueryUserDetails.data!}
          onSubmit={handleSubmit}
        />
      </ComponentOrLoader>
    </TableLayout>
  );
};

export default UsersPage;
