import {
  createColumnHelper,
  getCoreRowModel,
  OnChangeFn,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { UsersResponse } from "@hooks/users/useGetUsers.ts";
import TableView from "@components/Shared/Table/TableView.tsx";
import TableManagement from "@components/Shared/Table/TableManagment.tsx";
import TableCard from "@components/Shared/Table/TableCard.tsx";
import { useMemo } from "react";
import UsersRowActions from "./UsersRowActions";
import Chip from "@components/Shared/Chip";
import { UserDetailsDto } from "@api/models/User";

/**
 * Props for the Users component.
 */
export type UsersProps = {
  onChangeUserDetails?: (userId: string) => void;
  dataQuery: UsersResponse | undefined;
  sorting: SortingState;
  pagination: PaginationState;
  setSorting: OnChangeFn<SortingState>;
  setPagination: OnChangeFn<PaginationState>;
  onEdit: (userId: string) => void;
  onDelete: (userId: string) => void;
  onChangePassword: (userId: string) => void;
};

const columnHelper = createColumnHelper<UserDetailsDto>();

/**
 * Users Component
 *
 * Users component displays a table of user details with sorting and pagination functionality.
 *
 * @component
 * @param {UsersProps} props - The props for the Users component.
 *
 */
const Users = (props: UsersProps) => {
  const columns = useMemo(
    () => [
      columnHelper.accessor("email", {
        header: "Email",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("role", {
        header: "Role",
        cell: (info) => <Chip value={info.getValue()} />,
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        size: 0,
        cell: ({ row }) => (
          <UsersRowActions
            onEdit={() => props.onEdit(row.original.id)}
            onDelete={() => props.onDelete(row.original.id)}
            onChangePassword={() => props.onChangePassword(row.original.id)}
          />
        ),
      }),
    ],
    [],
  );
  const table = useReactTable({
    columns: columns,
    data: props.dataQuery?.rows ?? [],
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      size: "auto" as unknown as number,
    },
    state: {
      sorting: props.sorting,
      pagination: props.pagination,
    },
    rowCount: props.dataQuery?.rowsAmount ?? 0,
    onSortingChange: props.setSorting,
    onPaginationChange: props.setPagination,
    manualSorting: true,
    manualPagination: true,
  });

  const handleClick = (id: string | null | undefined) => {
    props.onChangeUserDetails?.(id?.toString() ?? "");
  };

  return (
    <TableCard className="!h-full">
      <TableView<UserDetailsDto> table={table} handleClickRow={handleClick} />
      <TableManagement<UserDetailsDto> table={table} />
    </TableCard>
  );
};

export default Users;
