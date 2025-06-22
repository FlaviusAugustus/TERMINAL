import { useMemo, useState } from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";

interface UseEditableTableOptions<TData extends { value?: unknown }> {
  steps: Array<{ parameters: TData[] }>;
  columns: any;
  updateData?: (rowIndex: number, columnId: string, value: unknown) => void;
}

export function useEditableStepTable<TData extends { value?: unknown }>({
  steps,
  columns,
  updateData,
}: UseEditableTableOptions<TData>) {
  const [index, setIndex] = useState(0);

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
