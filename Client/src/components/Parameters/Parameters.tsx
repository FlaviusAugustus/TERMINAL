import {AllParameters} from "@api/models/Parameters.ts";
import {
    createColumnHelper,
    getCoreRowModel, getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    Row,
    useReactTable
} from "@tanstack/react-table";
import {useMemo, useState} from "react";
import IndeterminateCheckbox from "@components/Shared/IndeterminateCheckbox.tsx";
import SamplesRowActions from "@components/Samples/SamplesRowActions.tsx";
import TableCard from "@components/Shared/Table/TableCard.tsx";
import TableView from "@components/Shared/Table/TableView.tsx";
import TableManagement from "@components/Shared/Table/TableManagment.tsx";
import Chip from "@components/Shared/Chip.tsx";

interface ParametersProps {
    parameters: Array<AllParameters>
}

const columnHelper = createColumnHelper<AllParameters>();

const Parameters = ({parameters}: ParametersProps) => {

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const columns = useMemo(
        () => [
            {
                id: "select-col",
                size: 0,
                header: ({ table }) => (
                    <IndeterminateCheckbox
                        checked={table.getIsAllRowsSelected()}
                        indeterminate={table.getIsSomeRowsSelected()}
                        onChange={table.getToggleAllPageRowsSelectedHandler()}
                    />
                ),
                cell: ({ row }: { row: Row<AllParameters> }) => (
                    <IndeterminateCheckbox
                        checked={row.getIsSelected()}
                        disabled={!row.getCanSelect()}
                        onChange={row.getToggleSelectedHandler()}
                    />
                ),
            },
            columnHelper.accessor("name", {
                header: "Name",
                cell: (info) => info.getValue(),
                sortingFn: 'alphanumeric'
            }),
            columnHelper.accessor("$type", {
                header: "Type",
                cell: (info) => <Chip value={info.getValue()}/>,
                sortingFn: 'alphanumeric'
            }),
            columnHelper.display({
                id: "actions",
                header: "Actions",
                size: 0,
                cell: ({ row }) => (
                    <SamplesRowActions
                        onEdit={() => {console.log(row)}}
                        onDelete={() => {}}
                    />
                ),
            }),
        ],
        [],
    );

    const table = useReactTable({
        columns: columns,
        data: parameters ?? [],
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        defaultColumn: {
            size: "auto" as unknown as number,
        },
        state: {
            pagination: pagination
            // rowSelection: rowSelection,
        },
        getRowId: (row) => row.id,
        onPaginationChange: setPagination,
        // onRowSelectionChange: setRowSelection,
        enableMultiRowSelection: true,
        // rowCount: 99,
    });

    return (
        <>
            <TableCard className="!h-full">
                <TableView<AllParameters> table={table} />
                <TableManagement<AllParameters> table={table} />
            </TableCard>
        </>
    );
};

export default Parameters;