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
    <div className="py-2 flex flex-wrap gap-2 w-full relative">
      {table.getRowModel().rows.map((row) => (
        <div key={row.id} className="w-full border rounded-lg bg-white">
          <div className="flex justify-between items-center ps-2 pe-1 py-1 bg-white rounded-t-lg border-b">
            {row
              .getVisibleCells()
              .filter((c) => !dataColumns.has(c.column.id))
              .map((cell) => (
                <div key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
          </div>
          <div className="flex flex-col justify-center bg-white rounded-md">
            {row
              .getVisibleCells()
              .filter((c) => dataColumns.has(c.column.id))
              .map((cell) => (
                <div
                  key={cell.id}
                  className="px-3 justify-center grid grid-cols-5 group"
                >
                  <div className="flex col-span-2 p-3 h-[54px] items-center text-sm font-sans font-medium text-gray-600">
                    {flexRender(cell.column.columnDef.header, null!)}
                  </div>
                  <div className="flex col-span-3 p-3 h-[54px] w-full items-center text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                  <div className="h-px border-t col-span-5 group-last:hidden"></div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardView;
