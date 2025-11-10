import { useMemo } from "react";
import IndeterminateCheckbox from "@components/shared/table/IndeterminateCheckbox.tsx";
import {
  ColumnDef,
  createColumnHelper,
  HeaderContext,
  Row,
} from "@tanstack/react-table";
import RowActions from "@components/shared/table/RowActions.tsx";
import useIsOnline from "./useIsOnline";
import { QueryKey, useQueryClient } from "@tanstack/react-query";

type UseTableColumnsProps<T> = {
  columnsDef: ColumnDef<T>[];
  onDetails?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  detailsQueryKeyBuilder?: (id: string) => QueryKey;
};

export function useTableColumns<T extends { id: string }>({
  columnsDef,
  onDetails,
  onEdit,
  onDelete,
  detailsQueryKeyBuilder,
}: UseTableColumnsProps<T>) {
  const columnHelper = createColumnHelper<T>();
  const online = useIsOnline();
  const queryClient = useQueryClient();

  const editDisabled = (id: string) => {
    if (online) return true;
    if (!online && !detailsQueryKeyBuilder) return true;
    if (
      !online &&
      queryClient.getQueryData(detailsQueryKeyBuilder!(id)) !== undefined
    )
      return true;
    return false;
  };

  return useMemo(
    () => [
      {
        id: "select-col",
        size: 0,
        header: ({ table }: HeaderContext<T, string>) => (
          <IndeterminateCheckbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
          />
        ),
        cell: ({ row }: { row: Row<T> }) => (
          <IndeterminateCheckbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      },
      ...columnsDef,
      columnHelper.display({
        id: "actions",
        header: "Actions",
        size: 0,
        cell: ({ row }) => (
          <RowActions
            disabled={!editDisabled(row.original.id)}
            onDetails={onDetails ? () => onDetails(row.original.id) : undefined}
            onEdit={onEdit ? () => onEdit(row.original.id) : undefined}
            onDelete={onDelete ? () => onDelete(row.original.id) : undefined}
          />
        ),
      }),
    ],
    [onDetails, onEdit, onDelete]
  );
}
