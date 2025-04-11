import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import ChevronUpIcon from "@heroicons/react/24/outline/ChevronUpIcon";
import { flexRender, Table } from "@tanstack/react-table";
import clsx from "clsx";

interface TableElement {
  id: string;
}

export interface TableViewProps<T extends TableElement> {
  table: Table<T>;
  handleClickRow: (id: string) => void;
}

const TableView = <T extends TableElement>(props: TableViewProps<T>) => {
  return (
    <table className="table">
      <thead>
        {props.table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                <div
                  onClick={header.column.getToggleSortingHandler()}
                  className={clsx(
                    header.column.getCanSort() && "cursor-pointer select-none",
                    "flex gap-2 items-center",
                  )}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  {{
                    asc: <ChevronUpIcon className="h-3" />,
                    desc: <ChevronDownIcon className="h-3" />,
                  }[header.column.getIsSorted() as string] ?? (
                    <ChevronDownIcon className="h-3 invisible" />
                  )}
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="">
        {props.table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            onClick={() => props.handleClickRow(row.original.id)}
            className="hover:bg-gray-100 cursor-pointer text-xs"
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableView;
