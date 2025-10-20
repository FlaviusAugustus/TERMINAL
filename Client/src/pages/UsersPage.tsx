import Users from "@components/users/Users.tsx";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { useUsers } from "@hooks/users/useGetUsers.ts";
import UserDetails from "@components/users/UserDetails.tsx";
import { useUserDetails } from "@hooks/users/useGetUserDetails.ts";
import { useDeleteUser } from "@hooks/users/useDeleteUser.ts";
import { toastError, toastPromise } from "@utils/toast.utils.tsx";
import { useUpdateUserEmail } from "@hooks/users/useUpdateUserEmail.ts";
import { useUpdateUserRole } from "@hooks/users/useUpdateUserRole.ts";
import { useState } from "react";
import TableLayout from "./layouts/TableLayout.tsx";
import ComponentOrLoader from "@components/shared/loader/ComponentOrLoader.tsx";
import Loader from "@components/shared/loader/Loader.tsx";

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
    await toastPromise(deleteMutation.mutateAsync(id), {
      loading: "Deleting user...",
      success: "User deleted successfully",
      error: "Failed to delete user",
    });
  };

  const handleSubmit = async (id: string, email: string, role: string) => {
    const hasEmailChanged = dataQueryUserDetails.data?.email !== email;
    const hasRoleChanged = dataQueryUserDetails.data?.role !== role;

    if (!hasEmailChanged && !hasRoleChanged) return;

    let errorOccurred = false;

    if (hasEmailChanged) {
      try {
        await updateEmailMutation.mutateAsync({ id, email });
      } catch {
        toastError(`Error while updating email`);
        errorOccurred = true;
      }
    }

    if (hasRoleChanged) {
      try {
        await updateRoleMutation.mutateAsync({ id, role });
      } catch {
        toastError(`Error while updating role`);
        errorOccurred = true;
      }
    }

    if (!errorOccurred) {
      setDetailsOpen(false);
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
          isSubmitting={
            updateEmailMutation.isPending || updateRoleMutation.isPending
          }
        />
      </ComponentOrLoader>
    </TableLayout>
  );
};

export default UsersPage;
