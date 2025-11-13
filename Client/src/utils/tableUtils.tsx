import { AllParameters } from "@api/models/Parameters";
import useGetAllParameters from "@hooks/parameters/useGetAllParameters";
import { RowData, ColumnDef } from "@tanstack/react-table";
import { useState, useEffect } from "react";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData?: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

// Give our default column cell renderer editing superpowers!
const editableColumn: Partial<ColumnDef<AllParameters>> = {
  cell: ({ getValue, row: { index, original }, column: { id }, table }) => {
    const initialValue = getValue();
    const parameters = useGetAllParameters();

    const parameterOrigin = parameters.data?.parameters.find(
      (p) => p.name === original.name
    );

    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue);

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      if (table.options.meta?.updateData)
        table.options.meta?.updateData(index, id, value);
    };

    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return parameterOrigin && parameterOrigin.$type === "text" ? (
      <select
        className="bg-transparent p-1 border rounded w-full"
        value={value as string}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      >
        {parameterOrigin.allowedValues?.map((val) => (
          <option key={val}>{val}</option>
        ))}
      </select>
    ) : (
      <input
        type="number"
        className="bg-transparent p-1 border rounded w-full"
        value={value as number}
        step={parameterOrigin?.step}
        onChange={(e) => {
          e.target.focus();
          setValue(e.target.value);
        }}
        onBlur={onBlur}
      />
    );
  },
};

export { editableColumn };
