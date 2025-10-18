import { flexRender } from "@tanstack/react-table";
import { TableViewProps } from "./TableView";

interface TableElement {
  id: string;
}

const CardView = <T extends TableElement>({ table }: TableViewProps<T>) => {
  const checkboxColumn = table.getAllColumns()[0];
  const actionsColumn = table.getAllColumns()[table.getAllColumns().length - 1];
  const dataColumns = new Set(
    table
      .getAllColumns()
      .filter((c) => c.id != checkboxColumn.id && c.id != actionsColumn.id)
      .map((c) => c.id)
  );

  return (
    <div className="py-2 min-h-[196px] flex flex-wrap gap-2 w-full">
      {table.getRowModel().rows.map((row) => (
        <div
          key={row.id}
          className="relative aspect-video w-full border rounded-lg bg-white"
        >
          <div className="flex justify-between items-center ps-2 pe-1 py-1 bg-white rounded-t-lg border-b">
            {row
              .getVisibleCells()
              .filter(
                (c) =>
                  c.column.id === checkboxColumn.id ||
                  c.column.id == actionsColumn.id
              )
              .map((cell) => (
                <div key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
          </div>
          <table className="flex flex-col gap-2 p-3 justify-center">
            <tbody>
              {row
                .getVisibleCells()
                .filter((c) => dataColumns.has(c.column.id))
                .map((cell) => (
                  <tr
                    key={cell.id}
                    className="flex flex-row items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {flexRender(cell.column.columnDef.header, null!)}:
                      </p>
                    </div>
                    <div>
                      <p className="text-sm">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </p>
                    </div>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default CardView;
