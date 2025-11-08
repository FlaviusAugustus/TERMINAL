import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  OnChangeFn,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ProcessesResponse } from "@hooks/processes/useGetProcesses.ts";
import { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import IconButton from "@components/shared/common/IconButton.tsx";
import FormInput from "@components/shared/form/FormInput.tsx";
import { Link } from "react-router-dom";
import VisibleForRoles from "@components/shared/common/VisibleForRoles.tsx";
import { useTableColumns } from "@hooks/useTableColumns.tsx";
import { Process } from "@api/models/Process.ts";
import TableOrCardLayout from "@components/shared/table/TableOrCardLayout";

export interface SamplesProps {
  onChangeSampleDetails?: (code: string) => void;
  processes: ProcessesResponse | undefined;
  sorting: SortingState;
  pagination: PaginationState;
  setSorting: OnChangeFn<SortingState>;
  setPagination: OnChangeFn<PaginationState>;
  onEdit: (sampleId: string) => void;
  onDelete: (sampleId: string | string[]) => void;
  onDetails: (sampleId: string) => void;
  searchProps?: {
    onSearch?: (phrase: string) => void;
    searchValue?: string;
    onClearSearch?: () => void;
  };
}

const columnHelper = createColumnHelper<Process>();

const columnsDef = [
  columnHelper.accessor("code", {
    header: "Code",
    cell: (info) => info.getValue().prefix + info.getValue().sequentialNumber,
  }),
  columnHelper.accessor("createdAtUtc", {
    header: "Created At",
    cell: (info) => new Date(info.getValue()).toDateString(),
  }),
] as Array<ColumnDef<Process, unknown>>;

/**
 * processes Component
 *
 * A component that displays a list of processes in a table format.
 * It allows for sorting and pagination of the sample data.
 * It also provides a way to handle row clicks to view sample details.
 *
 * @component
 * @param {SamplesProps} props - The properties for the processes component.
 */
const Processes = (props: SamplesProps) => {
  const columns = useTableColumns<Process>({
    columnsDef: columnsDef,
    onDelete: props.onDelete,
    onEdit: props.onEdit,
    onDetails: props.onDetails,
  });
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [localSearch, setLocalSearch] = useState(
    props.searchProps?.searchValue || ""
  );

  useEffect(() => {
    setLocalSearch(props.searchProps?.searchValue || "");
  }, [props.searchProps?.searchValue]);

  const table = useReactTable({
    columns: columns,
    data: props.processes?.rows ?? [],
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
    rowCount: props.processes?.rowsAmount ?? 0,
    onSortingChange: props.setSorting,
    onPaginationChange: props.setPagination,
    manualSorting: true,
    manualPagination: true,
  });

  const handleDeleteSelected = () => {
    const ids = table.getSelectedRowModel().rows.map((row) => row.original.id);
    if (ids.length === 0) return;
    props.onDelete(ids);
  };

  return (
    <>
      <div className="flex justify-between gap-1 items-end pb-3 h-14">
        <div className="flex items-center gap-1">
          <FormInput
            validate={false}
            className="!text-sm !h-[40px] focus:!ring-0 focus:!ring-offset-0"
            placeholder="Search"
            icon={<MagnifyingGlassIcon className="h-4" />}
            value={localSearch}
            onChange={(e) => setLocalSearch(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                props.searchProps?.onSearch?.(localSearch);
              }
            }}
          />
        </div>
        <VisibleForRoles roles={["Administrator", "Moderator"]}>
          <div className="flex gap-1">
            <IconButton
              onClick={handleDeleteSelected}
              disabled={
                !(table.getIsSomeRowsSelected() || table.getIsAllRowsSelected())
              }
              className="h-[40px] w-[40px] md:w-auto flex justify-center bg-white items-center gap-1 !hover:border-red-200"
            >
              <XMarkIcon className="h-4 " />
              <p className="text-xs hidden md:block">Delete Selected</p>
            </IconButton>
            <Link to="/new-sample">
              <IconButton className="h-[40px] w-[40px] md:w-auto flex justify-center bg-white items-center gap-1">
                <PlusIcon className="h-4" />
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

export default Processes;
