import {SampleDto} from "@api/terminalSchemas";
import {ColumnDef, OnChangeFn} from "@tanstack/react-table";
import {
    getCoreRowModel,
    useReactTable,
    createColumnHelper,
    SortingState,
    PaginationState,
} from "@tanstack/react-table";
import { SamplesResponse } from "@hooks/samples/useGetSamples.ts";
import {useEffect, useState} from "react";
import Chip from "@components/Shared/Chip";
import {
    MagnifyingGlassIcon,
    PlusIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import IconButton from "@components/Shared/IconButton";
import InputField from "@components/Shared/InputField";
import TableCard from "@components/Shared/Table/TableCard";
import TableManagement from "@components/Shared/Table/TableManagment";
import TableView from "@components/Shared/Table/TableView";
import {Link} from "react-router-dom";
import VisibleForRoles from "@components/Shared/VisibleForRoles.tsx";
import {toastPromise} from "utils/toast.utils";
import {useTableColumns} from "@hooks/useTableColumns.tsx";

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
    onSearch: (query: string) => void;
    isSearching: boolean;
    searchValue: string;
}

const columnHelper = createColumnHelper<SampleDto>();

const columnsDef = [
    columnHelper.accessor("code", {
        header: "Code",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("project", {
        header: "Project Name",
        cell: (info) => <Chip value={info.getValue()}/>,
    }),
    columnHelper.accessor("createdAtUtc", {
        header: "Created At",
        cell: (info) => new Date(info.getValue()).toDateString(),
    })
] as Array<ColumnDef<SampleDto, unknown>>

/**
 * Samples Component
 *
 * A component that displays a list of samples in a table format.
 * It allows for sorting and pagination of the sample data.
 * It also provides a way to handle row clicks to view sample details.
 *
 * @component
 * @param {SamplesProps} props - The properties for the Samples component.
 */
const Samples = (props: SamplesProps) => {

    const [localSearchValue, setLocalSearchValue] = useState<string>(props.searchValue || "");

    const handleDelete = async (id: string) => {
        await toastPromise(props.onDelete(id), {
            success: "Sample deleted successfully",
            loading: "Removing sample...",
            error: "Error deleting sample",
        });
    };

    const columns = useTableColumns<SampleDto>({
        columnsDef: columnsDef,
        onDelete: handleDelete,
        onEdit: props.onEdit,
        onDetails: props.onDetails
    })
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

    useEffect(() => {
        setLocalSearchValue(props.searchValue || "");
    }, [props.searchValue]);

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
            success: "Samples deleted succesfully",
            loading: "Removing samples...",
            error: "Error deleting samples",
        });
    };

  return (
      <>
        <div className="flex justify-between gap-1 items-end pb-3 h-14">
          <InputField
              className="!text-sm !h-[40px]"
              placeholder="Search"
              icon={<MagnifyingGlassIcon className="h-4" />}
              value={localSearchValue}
              onChange={(e) => setLocalSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  props.onSearch(localSearchValue.trim());
                }
              }}

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
          <TableView<SampleDto> table={table} />
          <TableManagement<SampleDto> table={table} />
        </TableCard>
      </>
  );
};

export default Samples;