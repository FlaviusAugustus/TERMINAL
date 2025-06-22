import { useMemo, useState } from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import useParameterColumns from "./useParameterColumns";
import { AllParameters } from "@api/models/Parameters";

interface UseEditableTableOptions {
  steps: Array<{ parameters: AllParameters[] }>;
  updateData?: (rowIndex: number, columnId: string, value: unknown) => void;
}

export function useEditableStepTable({
  steps,
  updateData,
}: UseEditableTableOptions) {
  const [index, setIndex] = useState(0);

  const isEditable = updateData === undefined;

  const columns = useParameterColumns(isEditable);

  const pageData = useMemo(() => {
    if (!steps || steps.length === 0) return [];
    return steps?.[index]?.parameters;
  }, [steps, index]);

  const table = useReactTable({
    columns,
    data: pageData,
    getCoreRowModel: getCoreRowModel(),
    enableMultiRowSelection: true,
    meta: {
      updateData,
    },
    state: {
      pagination: {
        pageIndex: index,
        pageSize: pageData.length,
      },
    },
  });

  return {
    index,
    setIndex,
    pageData,
    table,
  };
}
