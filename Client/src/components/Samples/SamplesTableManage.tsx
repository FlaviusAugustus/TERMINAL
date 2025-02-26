import { Table } from "@tanstack/react-table";
import { SampleDto } from "../../api/terminalSchemas";
import { clsx } from "clsx";
import {
  ChevronLeftIcon,
  ChevronDoubleLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
  CheckIcon,
  ChevronDownIcon,
} from "@heroicons/react/16/solid";
import {
  Button,
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
export interface SamplesTableManageProps {
  table: Table<SampleDto>;
}

const SamplesTableManage = (props: SamplesTableManageProps) => {
  return (
    <div className="m-1 flex justify-between">
      <Button
        className="btn border rounded m-1"
        onClick={() => props.table.firstPage()}
        disabled={!props.table.getCanPreviousPage()}
      >
        <ChevronDoubleLeftIcon className="h-4 w-4" />
      </Button>
      <Button
        className="btn border rounded m-1"
        onClick={() => props.table.previousPage()}
        disabled={!props.table.getCanPreviousPage()}
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
      <div className="flex flex-col justify-center items-center">
        <div className="m-1">
          Page
          {props.table.getState().pagination.pageIndex + 1} of{" "}
          {props.table.getPageCount().toLocaleString()}
        </div>
        <select
          className="select border rounded"
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
      <Button
        className="btn border rounded m-1"
        onClick={() => props.table.nextPage()}
        disabled={!props.table.getCanNextPage()}
      >
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
      <Button
        className="btn border rounded m-1"
        onClick={() => props.table.lastPage()}
        disabled={!props.table.getCanNextPage()}
      >
        <ChevronDoubleRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SamplesTableManage;
