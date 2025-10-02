import { Table } from "@tanstack/react-table";
import {
  ChevronLeftIcon,
  ChevronDoubleLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/16/solid";
import { Button } from "@headlessui/react";
import { HTMLAttributes } from "react";

export interface TableManagementProps<T> {
  table: Table<T>;
}

const TableManagement = <T,>(props: TableManagementProps<T>) => {
  return (
    <div className="flex p-3 border-t border-gray-200 justify-end">
      <div className="flex gap-1">
        <div className="h-6 border rounded flex justify-center items-center overflow-hidden">
          <select
            className="text-xs bg-white"
            value={props.table.getState().pagination.pageSize}
            onChange={(e) => {
              props.table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center items-center text-xs border border-gray-200 rounded h-6 px-1 tabular-nums">
          {props.table.getState().pagination.pageIndex + 1} of{" "}
          {props.table.getPageCount().toLocaleString()}
        </div>
        <TableManagementButton
          onClick={() => props.table.firstPage()}
          disabled={!props.table.getCanPreviousPage()}
        >
          <ChevronDoubleLeftIcon className="h-4 w-4" />
        </TableManagementButton>
        <TableManagementButton
          onClick={() => props.table.previousPage()}
          disabled={!props.table.getCanPreviousPage()}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </TableManagementButton>
        <TableManagementButton
          onClick={() => props.table.nextPage()}
          disabled={!props.table.getCanNextPage()}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </TableManagementButton>
        <TableManagementButton
          onClick={() => props.table.lastPage()}
          disabled={!props.table.getCanNextPage()}
        >
          <ChevronDoubleRightIcon className="h-4 w-4" />
        </TableManagementButton>
      </div>
    </div>
  );
};

type TableManagementButtonProps = HTMLAttributes<HTMLButtonElement> & {
  disabled: boolean;
  children: React.ReactNode;
};

const TableManagementButton = ({
  onClick,
  disabled,
  children,
  ...rest
}: TableManagementButtonProps) => {
  return (
    <Button
      {...rest}
      className="h-6 w-6 hover:bg-gray-100 disabled:bg-gray-100 flex items-center justify-center border rounded"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default TableManagement;
