import {
  createColumnHelper,
  getCoreRowModel,
  OnChangeFn,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { RecipesResponse } from "@hooks/recipes/useGetRecipes.ts";
import { RecipeDto } from "@api/terminalSchemas.ts";
import TableView from "@components/Shared/Table/TableView.tsx";
import TableManagement from "@components/Shared/Table/TableManagment.tsx";
import TableCard from "@components/Shared/Table/TableCard";
import IndeterminateCheckbox from "@components/Shared/IndeterminateCheckbox";
import RecipesRowActions from "./RecipesRowActions";
import { useMemo, useState } from "react";

export interface RecipesProps {
  recipe: RecipesResponse | undefined;
  sorting: SortingState;
  setSorting: OnChangeFn<SortingState>;
  pagination: PaginationState;
  setPagination: OnChangeFn<PaginationState>;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDetails: (id: string) => void;
}

const columnHelper = createColumnHelper<RecipeDto>();

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
  const columns = useMemo(
    () => [
      {
        id: "select-col",
        size: 0,
        header: ({ table }) => (
          <IndeterminateCheckbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
          />
        ),
        cell: ({ row }: { row: Row<RecipeDto> }) => (
          <IndeterminateCheckbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      },
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        size: 0,
        cell: ({ row }) => (
          <RecipesRowActions
            onEdit={() => onEdit(row.original.id)}
            onDetails={() => onDetails(row.original.id)}
            onDelete={() => onDelete(row.original.id)}
          />
        ),
      }),
    ],
    [],
  );

  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

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
    <TableCard className="w-[1000px]">
      <TableView table={table} />
      <TableManagement table={table} />
    </TableCard>
  );
};

export default Recipes;
