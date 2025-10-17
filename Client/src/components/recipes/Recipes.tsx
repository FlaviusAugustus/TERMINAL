import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  OnChangeFn,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { RecipesResponse } from "@hooks/recipes/useGetRecipes.ts";
import TableView from "@components/shared/table/TableView.tsx";
import TableManagement from "@components/shared/table/TableManagment.tsx";
import TableCard from "@components/shared/table/TableCard";
import { useEffect, useState } from "react";
import IconButton from "@components/shared/common/IconButton.tsx";
import FormInput from "@components/shared/form/FormInput.tsx";
import VisibleForRoles from "@components/shared/common/VisibleForRoles.tsx";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { toastPromise } from "utils/toast.utils";
import { useTableColumns } from "@hooks/useTableColumns.tsx";
import { Recipe } from "@api/models/Recipe";

export interface RecipesProps {
  recipe: RecipesResponse | undefined;
  sorting: SortingState;
  setSorting: OnChangeFn<SortingState>;
  pagination: PaginationState;
  setPagination: OnChangeFn<PaginationState>;
  onEdit: (id: string) => void;
  onDelete: (id: string) => Promise<void>;
  onDetails: (id: string) => void;
  searchProps?: {
    onSearch?: (phrase: string) => void;
    searchValue?: string;
    onClearSearch?: () => void;
  };
}

const columnHelper = createColumnHelper<Recipe>();

const columnsDef = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
] as Array<ColumnDef<Recipe, unknown>>;

/**
 * recipes Component
 *
 * A component that displays a list of recipes in a table format.
 * It allows sorting and pagination of the recipes.
 * It also provides a way to change the recipe details when a row is clicked.
 *
 * @component
 * @param {RecipesProps} props - The properties for the recipes component.
 */
const Recipes = (props: RecipesProps) => {
  const handleDelete = async (id: string) => {
    await toastPromise(props.onDelete(id), {
      success: "Recipe deleted succesfully",
      loading: "Removing recipe...",
      error: "Error deleting recipe",
    });
  };

  const columns = useTableColumns<Recipe>({
    columnsDef: columnsDef,
    onEdit: props.onEdit,
    onDelete: handleDelete,
    onDetails: props.onDetails,
  });

  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [localSearch, setLocalSearch] = useState(
    props.searchProps?.searchValue || ""
  );

  useEffect(() => {
    setLocalSearch(props.searchProps?.searchValue || "");
  }, [props.searchProps?.searchValue]);

  const handleDeleteSelected = () => {
    const tasks = table.getSelectedRowModel().rows.map((row) => {
      props.onDelete(row.original.id);
    });

    toastPromise(Promise.all(tasks), {
      success: "recipes deleted succesfully",
      loading: "Removing recipes...",
      error: "Error deleting recipes",
    });
  };

  const table = useReactTable({
    columns: columns,
    data: props.recipe?.rows ?? [],
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
    rowCount: props.recipe?.rowsAmount ?? 0,
    onSortingChange: props.setSorting,
    onPaginationChange: props.setPagination,
    manualSorting: true,
    manualPagination: true,
  });

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
            <Link to="/new-recipe">
              <IconButton className="h-[40px] flex bg-white items-center gap-1">
                <PlusIcon className="h-4" />
                <p className="text-xs">Add new</p>
              </IconButton>
            </Link>
          </div>
        </VisibleForRoles>
      </div>
      <TableCard className="!h-full">
        <TableView table={table} />
        <TableManagement table={table} />
      </TableCard>
    </>
  );
};

export default Recipes;
