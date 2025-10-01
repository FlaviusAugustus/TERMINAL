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
import TableView from "@components/Shared/Table/TableView.tsx";
import TableManagement from "@components/Shared/Table/TableManagment.tsx";
import TableCard from "@components/Shared/Table/TableCard";
import { useState } from "react";
import IconButton from "@components/Shared/IconButton.tsx";
import LabeledInput from "@components/Shared/Form/LabeledInput.tsx";
import VisibleForRoles from "@components/Shared/VisibleForRoles";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  PlusIcon,
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
}

const columnHelper = createColumnHelper<Recipe>();

const columnsDef = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
] as Array<ColumnDef<Recipe, unknown>>;

/**
 * Recipes Component
 *
 * A component that displays a list of recipes in a table format.
 * It allows sorting and pagination of the recipes.
 * It also provides a way to change the recipe details when a row is clicked.
 *
 * @component
 * @param {RecipesProps} props - The properties for the Recipes component.
 */
const Recipes = ({
  recipe,
  sorting,
  setSorting,
  pagination,
  setPagination,
  onEdit,
  onDelete,
  onDetails,
}: RecipesProps) => {
  const handleDelete = async (id: string) => {
    await toastPromise(onDelete(id), {
      success: "Recipe deleted succesfully",
      loading: "Removing recipe...",
      error: "Error deleting recipe",
    });
  };

  const columns = useTableColumns<Recipe>({
    columnsDef: columnsDef,
    onEdit: onEdit,
    onDelete: handleDelete,
    onDetails: onDetails,
  });

  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  const handleDeleteSelected = () => {
    const tasks = table.getSelectedRowModel().rows.map((row) => {
      onDelete(row.original.id);
    });

    toastPromise(Promise.all(tasks), {
      success: "Recipes deleted succesfully",
      loading: "Removing recipes...",
      error: "Error deleting recipes",
    });
  };

  const table = useReactTable({
    columns: columns,
    data: recipe?.rows ?? [],
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      size: "auto" as unknown as number,
    },
    state: {
      sorting: sorting,
      pagination: pagination,
      rowSelection: rowSelection,
    },
    getRowId: (row) => row.id,
    onRowSelectionChange: setRowSelection,
    enableMultiRowSelection: true,
    rowCount: recipe?.rowsAmount ?? 0,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    manualSorting: true,
    manualPagination: true,
  });

  return (
    <>
      <div className="flex justify-between gap-1 items-end pb-3 h-14">
        <LabeledInput
          validate={false}
          className="!text-sm !h-[40px]"
          placeholder="Search"
          icon={<MagnifyingGlassIcon className="h-4" />}
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
