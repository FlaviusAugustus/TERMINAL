import { AllParameters } from "@api/models/Parameters.ts";
import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import TableCard from "@components/Shared/Table/TableCard.tsx";
import TableView from "@components/Shared/Table/TableView.tsx";
import TableManagement from "@components/Shared/Table/TableManagment.tsx";
import Chip from "@components/Shared/Chip.tsx";
import { useTableColumns } from "@hooks/useTableColumns.tsx";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import VisibleForRoles from "@components/Shared/VisibleForRoles.tsx";
import IconButton from "@components/Shared/IconButton.tsx";
import { Link } from "react-router-dom";
import InputField from "@components/Shared/InputField.tsx";

interface ParametersProps {
  parameters: Array<AllParameters>;
  onDetails: (parameterId: string) => void;
  onDelete: (parameterId: string) => Promise<void>;
}

const columnHelper = createColumnHelper<AllParameters>();

const columnsDef = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("$type", {
    header: "Type",
    cell: (info) => <Chip value={info.getValue()} />,
    sortingFn: "alphanumeric",
  }),
] as Array<ColumnDef<AllParameters, unknown>>;

const Parameters = ({ parameters, onDetails, onDelete }: ParametersProps) => {
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [searchValue, setSearchValue] = useState<string>("");
  const [parametersFiltered, setParametersFiltered] = useState<
    Array<AllParameters>
  >([]);

  useEffect(() => {
    const filteredParams = parameters.filter((param) =>
      param.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setParametersFiltered(filteredParams);
  }, [parameters, searchValue]);

  const columns = useTableColumns<AllParameters>({
    columnsDef: columnsDef,
    onDetails: onDetails,
    onDelete: onDelete,
  });

  const table = useReactTable({
    columns: columns,
    data: parametersFiltered ?? [],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    defaultColumn: {
      size: "auto" as unknown as number,
    },
    state: {
      pagination: pagination,
      rowSelection: rowSelection,
    },
    getRowId: (row) => row.id,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    enableMultiRowSelection: true,
  });

  const handleDeleteSelected = () => {
    table.getSelectedRowModel().rows.forEach((row) => {
      onDelete(row.original.id);
    });
  };

  return (
    <>
      <div className="flex justify-between gap-1 items-end pb-3 h-14">
        <InputField
          validate={false}
          className="!text-sm !h-[40px]"
          placeholder="Search"
          icon={<MagnifyingGlassIcon className="h-4" />}
          onChange={(e) => setSearchValue(e.target.value)}
        />
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
            <Link to="/new-parameter">
              <IconButton className="h-[40px] flex bg-white items-center gap-1">
                <PlusIcon className="h-4" />
                <p className="text-xs">Add new</p>
              </IconButton>
            </Link>
          </div>
        </VisibleForRoles>
      </div>
      <TableCard className="!h-full">
        <TableView<AllParameters> table={table} />
        <TableManagement<AllParameters> table={table} />
      </TableCard>
    </>
  );
};

export default Parameters;
