import { ColumnDef } from "@tanstack/react-table";
import { AllParameters } from "./useGetParameters";
import { useMemo } from "react";
import { editableColumn } from "utils/tableUtils";

function useParameterColumns(editable: boolean = false) {
  const columns = useMemo<ColumnDef<AllParameters>[]>(
    () => [
      {
        id: "name",
        accessorFn: (param) => param.name,
      },
      {
        id: "value",
        accessorFn: (param) => param.value,
        ...(editable && editableColumn),
      },
      {
        id: "unit",
        accessorFn: (param) => (param.$type !== "text" ? param.unit : "-"),
      },
    ],
    [],
  );

  return columns;
}

export default useParameterColumns;
