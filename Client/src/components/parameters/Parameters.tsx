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
import Chip from "@components/shared/common/Chip.tsx";
import { useTableColumns } from "@hooks/useTableColumns.tsx";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import VisibleForRoles from "@components/shared/common/VisibleForRoles.tsx";
import IconButton from "@components/shared/common/IconButton.tsx";
import { Link } from "react-router-dom";
import FormInput from "@components/shared/form/FormInput.tsx";
import TableOrCardLayout from "@components/shared/table/TableOrCardLayout";

interface ParametersProps {
  parameters: Array<AllParameters>;
  onDetails: (parameterId: string) => void;
  onDelete: (parameterId: string | string[]) => void;
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
    detailsQueryKeyBuilder: () => ["parameters"],
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
    const ids = table.getSelectedRowModel().rows.map((row) => row.original.id);
    if (ids.length === 0) return;
    onDelete(ids);
  };

  return (
    <>
      <div className="flex justify-between gap-1 items-end pb-3 h-14">
        <FormInput
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
              className="h-[40px] flex w-[40px] md:w-auto bg-white justify-center  items-center gap-1 !hover:border-red-200"
            >
              <XMarkIcon className="h-4 w-4 md:w-auto" />
              <p className="text-xs hidden md:block">Delete Selected</p>
            </IconButton>
            <Link to="/new-parameter">
              <IconButton className="h-[40px] w-[40px] md:w-auto flex justify-center  bg-white items-center gap-1">
                <PlusIcon className="h-4 w-4 md:w-auto" />
                <p className="text-xs hidden md:block">Add new</p>
              </IconButton>
            </Link>
          </div>
        </VisibleForRoles>
      </div>
      <TableOrCardLayout table={table} />
    </>
  );
};

export default Parameters;
