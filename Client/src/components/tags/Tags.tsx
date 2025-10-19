import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  OnChangeFn,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Tag } from "@api/models/Tag.ts";
import { useEffect, useState } from "react";
import { useTableColumns } from "@hooks/useTableColumns.tsx";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import VisibleForRoles from "@components/shared/common/VisibleForRoles.tsx";
import IconButton from "@components/shared/common/IconButton.tsx";
import { TagsResponse } from "@hooks/tags/useGetAllTags.ts";
import { Link } from "react-router-dom";
import FormInput from "@components/shared/form/FormInput.tsx";
import TableOrCardLayout from "@components/shared/table/TableOrCardLayout";

export interface TagProps {
  tags: TagsResponse | undefined;
  sorting: SortingState;
  pagination: PaginationState;
  setSorting: OnChangeFn<SortingState>;
  setPagination: OnChangeFn<PaginationState>;
  onDetails: (tagId: string) => void;
  onDelete: (tagId: string) => void;
  onEdit: (tagId: string) => void;
  searchProps?: {
    onSearch?: (phrase: string) => void;
    searchValue?: string;
    onClearSearch?: () => void;
  };
}

const columnHelper = createColumnHelper<Tag>();

const columnsDef = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
] as Array<ColumnDef<Tag, unknown>>;

/**
 * Tag Component
 *
 * A component that displays a list of tags in a table format.
 * It allows sorting and pagination of the tag data.
 *
 * @component
 */
const Tags = (props: TagProps) => {
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [localSearch, setLocalSearch] = useState(
    props.searchProps?.searchValue || ""
  );

  useEffect(() => {
    setLocalSearch(props.searchProps?.searchValue || "");
  }, [props.searchProps?.searchValue]);

  const columns = useTableColumns<Tag>({
    columnsDef: columnsDef,
    onDetails: props.onDetails,
    onDelete: props.onDelete,
    onEdit: props.onEdit,
  });

  const table = useReactTable({
    columns: columns,
    data: props.tags?.rows ?? [],
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
    rowCount: props.tags?.rowsAmount ?? 0,
    onSortingChange: props.setSorting,
    onPaginationChange: props.setPagination,
    manualSorting: true,
    manualPagination: true,
  });

  const handleDeleteSelected = () => {
    table.getSelectedRowModel().rows.forEach((row) => {
      props.onDelete(row.original.id);
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
              className="h-[40px] flex w-[40px] md:w-auto bg-white justify-center  items-center gap-1 !hover:border-red-200"
            >
              <XMarkIcon className="h-4" />
              <p className="text-xs hidden md:block">Delete Selected</p>
            </IconButton>
            <Link to="/new-Tag">
              <IconButton className="h-[40px] w-[40px] md:w-auto justify-center  flex bg-white items-center gap-1">
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

export default Tags;
