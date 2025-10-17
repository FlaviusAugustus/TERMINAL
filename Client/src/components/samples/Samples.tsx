import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  OnChangeFn,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { SamplesResponse } from "@hooks/samples/useGetSamples.ts";
import { useEffect, useState } from "react";
import Chip from "@components/shared/common/Chip.tsx";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import IconButton from "@components/shared/common/IconButton.tsx";
import FormInput from "@components/shared/form/FormInput.tsx";
import TableCard from "@components/shared/table/TableCard";
import TableManagement from "@components/shared/table/TableManagment";
import TableView from "@components/shared/table/TableView";
import { Link } from "react-router-dom";
import VisibleForRoles from "@components/shared/common/VisibleForRoles.tsx";
import { toastPromise } from "utils/toast.utils";
import { useTableColumns } from "@hooks/useTableColumns.tsx";
import { Sample } from "@api/models/Sample";

export interface SamplesProps {
  onChangeSampleDetails?: (code: string) => void;
  samples: SamplesResponse | undefined;
  sorting: SortingState;
  pagination: PaginationState;
  setSorting: OnChangeFn<SortingState>;
  setPagination: OnChangeFn<PaginationState>;
  onEdit: (sampleId: string) => void;
  onDelete: (sampleId: string) => Promise<void>;
  onDetails: (sampleId: string) => void;
  searchProps?: {
    onSearch?: (phrase: string) => void;
    searchValue?: string;
    onClearSearch?: () => void;
  };
}

const columnHelper = createColumnHelper<Sample>();

const columnsDef = [
  columnHelper.accessor("code", {
    header: "Code",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("project", {
    header: "Project Name",
    cell: (info) => <Chip value={info.getValue()} />,
  }),
  columnHelper.accessor("createdAtUtc", {
    header: "Created At",
    cell: (info) => new Date(info.getValue()).toDateString(),
  }),
] as Array<ColumnDef<Sample, unknown>>;

/**
 * samples Component
 *
 * A component that displays a list of samples in a table format.
 * It allows for sorting and pagination of the sample data.
 * It also provides a way to handle row clicks to view sample details.
 *
 * @component
 * @param {SamplesProps} props - The properties for the samples component.
 */
const Samples = (props: SamplesProps) => {
  const handleDelete = async (id: string) => {
    await toastPromise(props.onDelete(id), {
      success: "Sample deleted successfully",
      loading: "Removing sample...",
      error: "Error deleting sample",
    });
  };

  const columns = useTableColumns<Sample>({
    columnsDef: columnsDef,
    onDelete: handleDelete,
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
    data: props.samples?.rows ?? [],
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
    rowCount: props.samples?.rowsAmount ?? 0,
    onSortingChange: props.setSorting,
    onPaginationChange: props.setPagination,
    manualSorting: true,
    manualPagination: true,
  });

  const handleDeleteSelected = () => {
    const tasks = table.getSelectedRowModel().rows.map((row) => {
      props.onDelete(row.original.id);
    });

    toastPromise(Promise.all(tasks), {
      success: "samples deleted succesfully",
      loading: "Removing samples...",
      error: "Error deleting samples",
    });
  };

  return (
    <>
      <div className="flex justify-between gap-1 items-end pb-3 h-14">
        <div className="flex items-center gap-1">
          <FormInput
            validate={false}
            className="!text-sm !h-[40px]"
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
          {localSearch && (
            <IconButton
              onClick={() => {
                setLocalSearch("");
                props.searchProps?.onClearSearch?.();
              }}
              className="h-[40px] flex bg-white items-center gap-1 !hover:border-gray-300"
              title="Clear search"
            >
              <XMarkIcon className="h-4" />
              <p className="text-xs">Clear</p>
            </IconButton>
          )}
        </div>
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
            <Link to="/new-sample">
              <IconButton className="h-[40px] flex bg-white items-center gap-1">
                <PlusIcon className="h-4" />
                <p className="text-xs">Add new</p>
              </IconButton>
            </Link>
          </div>
        </VisibleForRoles>
      </div>
      <TableCard className="!h-full">
        <TableView<Sample> table={table} />
        <TableManagement<Sample> table={table} />
      </TableCard>
    </>
  );
};

export default Samples;
