import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  OnChangeFn,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ProjectsResponse } from "@hooks/projects/useGetProjects.ts";
import TableView from "@components/Shared/Table/TableView.tsx";
import TableManagement from "@components/Shared/Table/TableManagment.tsx";
import TableCard from "@components/Shared/Table/TableCard";
import { Color } from "utils/colorUtils";
import Chip from "@components/Shared/Chip";
import { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import VisibleForRoles from "@components/Shared/VisibleForRoles.tsx";
import IconButton from "@components/Shared/IconButton.tsx";
import { Link } from "react-router-dom";
import { useTableColumns } from "@hooks/useTableColumns.tsx";
import { Project } from "@api/models/Project";
import InputField from "@components/Shared/InputField.tsx";

export interface ProjectsProps {
  onChangeProjectDetails: (id: string) => void;
  projects: ProjectsResponse | undefined;
  sorting: SortingState;
  pagination: PaginationState;
  setSorting: OnChangeFn<SortingState>;
  setPagination: OnChangeFn<PaginationState>;
  onEdit: (projectId: string) => void;
  onDelete: (projectId: string) => void;
  searchProps?: {
    onSearch?: (phrase: string) => void;
    searchValue?: string;
    onClearSearch?: () => void;
  };
}

function getChipColors(isActive: boolean): Color {
  return isActive ? "green" : "red";
}

function getChipValue(isActive: boolean): string {
  return isActive ? "Active" : "Not Active";
}

const columnHelper = createColumnHelper<Project>();

const columnsDef = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("isActive", {
    header: "Active",
    cell: (info) => (
      <Chip
        value={getChipValue(info.getValue())}
        getColorValue={() => getChipColors(info.getValue())}
      />
    ),
  }),
] as Array<ColumnDef<Project, unknown>>;

/**
 * Projects Component
 *
 * A component that displays a list of projects in a table format.
 * It allows sorting and pagination of the project data.
 * It also provides a way to change the project details view when a project is clicked.
 *
 * @component
 */
const Projects = (props: ProjectsProps) => {
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [localSearch, setLocalSearch] = useState(
    props.searchProps?.searchValue || ""
  );

  useEffect(() => {
    setLocalSearch(props.searchProps?.searchValue || "");
  }, [props.searchProps?.searchValue]);

  const columns = useTableColumns<Project>({
    columnsDef: columnsDef,
    onEdit: props.onEdit,
    onDelete: props.onDelete,
  });

  const table = useReactTable({
    columns: columns,
    data: props.projects?.rows ?? [],
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
    rowCount: props.projects?.rowsAmount ?? 0,
    onSortingChange: props.setSorting,
    onPaginationChange: props.setPagination,
    manualSorting: true,
    manualPagination: true,
  });

  const handleClick = (id: string | null | undefined) => {
    props.onChangeProjectDetails?.(id?.toString() ?? "");
  };

  const handleDeleteSelected = () => {
    table.getSelectedRowModel().rows.forEach((row) => {
      props.onDelete(row.original.id);
    });
  };

  return (
    <>
      <div className="flex justify-between gap-1 items-end pb-3 h-14">
        <div className="flex items-center gap-1">
          <InputField
            validate={false}
            className="!text-sm !h-[40px]"
            placeholder="Search"
            icon={<MagnifyingGlassIcon className="h-4" />}
            value={localSearch}
            onChange={(e) => setLocalSearch(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                props.searchProps?.onSearch?.(localSearch);
              }
            }}
          />
          {localSearch && (
            <IconButton
              onClick={() => {
                setLocalSearch(""); // czyszczenie inputa
                props.searchProps?.onClearSearch?.(); // wywołanie funkcji clear
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
            <Link to="/new-project">
              <IconButton className="h-[40px] flex bg-white items-center gap-1">
                <PlusIcon className="h-4" />
                <p className="text-xs">Add new</p>
              </IconButton>
            </Link>
          </div>
        </VisibleForRoles>
      </div>
      <TableCard className="!h-full">
        <TableView<Project> table={table} handleClickRow={handleClick} />
        <TableManagement<Project> table={table} />
      </TableCard>
    </>
  );
};

export default Projects;
