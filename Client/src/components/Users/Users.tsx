import {
  createColumnHelper,
  getCoreRowModel,
  HeaderContext,
  OnChangeFn,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { UsersResponse } from "@hooks/users/useGetUsers.ts";
import TableView from "@components/Shared/Table/TableView.tsx";
import TableManagement from "@components/Shared/Table/TableManagment.tsx";
import TableCard from "@components/Shared/Table/TableCard.tsx";
import { useMemo, useState } from "react";
import UsersRowActions from "./UsersRowActions";
import Chip from "@components/Shared/Chip";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import VisibleForRoles from "@components/Shared/VisibleForRoles.tsx";
import IconButton from "@components/Shared/IconButton.tsx";
import { Link } from "react-router-dom";
import IndeterminateCheckbox from "@components/Shared/IndeterminateCheckbox.tsx";
import { UserDetailsDto } from "@api/models/User";

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
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  const columns = useMemo(
    () => [
      {
        id: "select-col",
        size: 0,
        header: ({ table }: HeaderContext<UserDetailsDto, string>) => (
          <IndeterminateCheckbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
          />
        ),
        cell: ({ row }: { row: Row<UserDetailsDto> }) => (
          <IndeterminateCheckbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      },
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
    []
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
      rowSelection: rowSelection,
    },
    getRowId: (row) => row.id,
    onRowSelectionChange: setRowSelection,
    enableMultiRowSelection: true,
    rowCount: props.dataQuery?.rowsAmount ?? 0,
    onSortingChange: props.setSorting,
    onPaginationChange: props.setPagination,
    manualSorting: true,
    manualPagination: true,
  });

  const handleClick = (id: string | null | undefined) => {
    props.onChangeUserDetails?.(id?.toString() ?? "");
  };

  const handleDeleteSelected = () => {
    table.getSelectedRowModel().rows.forEach((row) => {
      props.onDelete(row.original.id);
    });
  };

  return (
    <>
      <div className="flex justify-end gap-1 items-end pb-3 h-14">
        <VisibleForRoles roles={["Administrator", "Moderator"]}>
          <div className="flex gap-1">
            <IconButton
              onClick={handleDeleteSelected}
              disabled={
                !(table.getIsSomeRowsSelected() || table.getIsAllRowsSelected())
              }
              className="h-[40px] flex bg-white items-center gap-1 !hover:border-red-200"
            >
              <XMarkIcon className="h-4 " />
              <p className="text-xs">Delete Selected</p>
            </IconButton>
            <Link to="/settings">
              <IconButton className="h-[40px] flex bg-white items-center gap-1">
                <PlusIcon className="h-4" />
                <p className="text-xs">Add new</p>
              </IconButton>
            </Link>
          </div>
        </VisibleForRoles>
      </div>
      <TableCard className="!h-full">
        <TableView<UserDetailsDto> table={table} handleClickRow={handleClick} />
        <TableManagement<UserDetailsDto> table={table} />
      </TableCard>
    </>
  );
};

export default Users;
