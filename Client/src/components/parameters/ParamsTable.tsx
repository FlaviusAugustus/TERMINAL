import { AllParameters } from "@api/models/Parameters";
import { DialogButton } from "@components/shared/dialog/DialogComp.tsx";
import TableCard from "@components/shared/table/TableCard";
import TableView from "@components/shared/table/TableView";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { editableColumn } from "utils/tableUtils";

type ParamsTableProps = {
  params: AllParameters[];
  editable: boolean;
};

const ParamsTable = ({ params, editable }: ParamsTableProps) => {
  const [newParams, setNewParams] = useState(params);

  const columns = useMemo<ColumnDef<AllParameters>[]>(
    () => [
      {
        id: "name",
        accessorFn: (param) => param.name,
      },
      {
        id: "value",
        accessorFn: (param) => param.value,
      },
      {
        id: "unit",
        accessorFn: (param) => (param.$type !== "Text" ? param.unit : "-"),
      },
    ],
    []
  );

  const table = useReactTable({
    columns: columns,
    defaultColumn: editable ? editableColumn : undefined,
    data: newParams,
    getCoreRowModel: getCoreRowModel(),
    enableMultiRowSelection: true,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        setNewParams((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <TableCard className="!shadow-none">
        <TableView table={table} />
      </TableCard>
      {editable && (
        <div className="w-full flex justify-end gap-2">
          <DialogButton
            className="w-fit hover:border-green-400"
            onClick={() => console.log(newParams)}
          >
            Save Changes
          </DialogButton>
          <DialogButton className="w-fit hover:border-blue-400">
            Reset
          </DialogButton>
        </div>
      )}
    </div>
  );
};

export default ParamsTable;
