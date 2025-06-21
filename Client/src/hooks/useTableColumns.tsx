import {useMemo} from "react";
import IndeterminateCheckbox from "@components/Shared/IndeterminateCheckbox.tsx";
import {
    ColumnDef,
    createColumnHelper,
    HeaderContext,
    Row,
} from "@tanstack/react-table";
import {AllParameters} from "@api/models/Parameters.ts";
import {ProjectDto, RecipeDto, SampleDto} from "@api/terminalSchemas.ts";
import RowActions from "@components/Shared/Table/RowActions.tsx";

type ColumnTypes = AllParameters | SampleDto | ProjectDto | RecipeDto;

type UseTableColumnsProps<T> = {
    columnsDef: ColumnDef<T>[];
    onDetails?: (id: string) => void;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
};

export function useTableColumns<T extends ColumnTypes>(
  {columnsDef, onDetails, onEdit, onDelete}: UseTableColumnsProps<T>
) {

    const columnHelper = createColumnHelper<T>();

    return useMemo(
      () => [
          {
              id: "select-col",
              size: 0,
              header: ({table}: HeaderContext<T, string>) => (
                <IndeterminateCheckbox
                  checked={table.getIsAllRowsSelected()}
                  indeterminate={table.getIsSomeRowsSelected()}
                  onChange={table.getToggleAllPageRowsSelectedHandler()}
                />
              ),
              cell: ({row}: { row: Row<T> }) => (
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
              cell: ({row}) => (
                <RowActions
                  onDetails={onDetails ? () => onDetails(row.original.id) : undefined}
                  onEdit={onEdit ? () => onEdit(row.original.id) : undefined}
                  onDelete={onDelete ? () => onDelete(row.original.id) : undefined}
                />
              ),
          }),
      ],
      []
    );
}