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

/**
 * TableView Component
 *
 * A generic table view component that renders a table with sortable headers and clickable rows.
 *
 * @component
 */
const TableView = <T extends TableElement>(props: TableViewProps<T>) => {
  return (
    <div className="overflow-auto">
      <table className="table">
        <thead>
          {props.table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="sticky top-0 bg-white border-b border-gray-200"
                >
                  <div
                    onClick={header.column.getToggleSortingHandler()}
                    className={clsx(
                      header.column.getCanSort() &&
                        "cursor-pointer select-none",
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
        <tbody>
          {props.table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => props.handleClickRow(row.original.id)}
              className="hover:bg-gray-50 text-xs"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{
                    width: cell.column.getSize(),
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
