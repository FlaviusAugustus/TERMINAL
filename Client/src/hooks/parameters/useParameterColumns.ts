import { AllParameters } from "@api/models/Parameters.ts";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { editableColumn } from "@utils/tableUtils.tsx";

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
    []
  );

  return columns;
}

export default useParameterColumns;
