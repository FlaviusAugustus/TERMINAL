import {
    createColumnHelper,
    getCoreRowModel,
    OnChangeFn,
    PaginationState,
    SortingState,
    useReactTable
} from "@tanstack/react-table";
import {UserDetailsDto} from "@api/terminalSchemas.ts";
import {UsersResponse} from "@hooks/users/useGetUsers.ts";
import TableView from "@components/Shared/Table/TableView.tsx";
import TableManagement from "@components/Shared/Table/TableManagment.tsx";
import TableCard from "@components/Shared/Table/TableCard.tsx";

/**
 * Props for the Users component.
 */
export interface UsersProps {
    onChangeUserDetails?: (userId: string) => void;
    dataQuery: UsersResponse | undefined;
    sorting: SortingState;
    pagination: PaginationState;
    setSorting: OnChangeFn<SortingState>;
    setPagination: OnChangeFn<PaginationState>
}

const columnHelper = createColumnHelper<UserDetailsDto>();
const columns= [
    columnHelper.accessor("email", {
        header: "Email",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("role", {
        header: "Role",
        cell: (info) => info.getValue(),
    }),
]

/**
 * Users component displays a table of user details with sorting and pagination functionality.
 *
 * @param {UsersProps} props - The props for the Users component.
 *
 * @returns {JSX.Element} The rendered Users component.
 */
const Users = (props: UsersProps) => {

    const table = useReactTable({
        columns: columns,
        data: props.dataQuery?.rows ?? [],
        getCoreRowModel: getCoreRowModel(),
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
        <TableCard>
            <TableView<UserDetailsDto> table={table} handleClickRow={handleClick} />
            <TableManagement<UserDetailsDto> table={table} />
        </TableCard>
    );
};

export default Users;