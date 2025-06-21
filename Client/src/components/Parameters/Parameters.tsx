import {AllParameters} from "@api/models/Parameters.ts";
import {
    createColumnHelper,
    getCoreRowModel, getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    useReactTable
} from "@tanstack/react-table";
import {useState} from "react";
import TableCard from "@components/Shared/Table/TableCard.tsx";
import TableView from "@components/Shared/Table/TableView.tsx";
import TableManagement from "@components/Shared/Table/TableManagment.tsx";
import Chip from "@components/Shared/Chip.tsx";
import {useTableColumns} from "@hooks/useTableColumns.tsx";

interface ParametersProps {
    parameters: Array<AllParameters>
    onEdit: (parameterId: string) => void;
}

const columnHelper = createColumnHelper<AllParameters>();

const columnsDef = [
    columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => info.getValue(),
        sortingFn: 'alphanumeric'
    }),
    columnHelper.accessor("$type", {
        header: "Type",
        cell: (info) => <Chip value={info.getValue()}/>,
        sortingFn: 'alphanumeric'
    })
]

const Parameters = ({parameters, onEdit}: ParametersProps) => {

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const columns = useTableColumns<AllParameters>({
        columnsDef: columnsDef,
        onEdit: onEdit
    })

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
    });

    return (
      <>
          <TableCard className="!h-full">
              <TableView<AllParameters> table={table}/>
              <TableManagement<AllParameters> table={table}/>
          </TableCard>
      </>
    );
};

export default Parameters;