import { SampleDto } from "@api/terminalSchemas";
import { OnChangeFn } from "@tanstack/react-table";
import SamplesTable from "./SamplesTable";
import {
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
  SortingState,
  PaginationState,
} from "@tanstack/react-table";
import SamplesTableManage from "./SamplesTableManage";
import {useEffect} from "react";
import {SamplesResponse} from "@hooks/useSampleQuery.ts";
import {UseQueryResult} from "@tanstack/react-query";

export interface SamplesProps {
  onChangeSampleDetails?: (code: string) => void;
  dataQuery: UseQueryResult<SamplesResponse, Error>;
  sorting: SortingState;
  pagination: PaginationState;
  setSorting: OnChangeFn<SortingState>;
  setPagination: OnChangeFn<PaginationState>;
}

const Samples = (props: SamplesProps) => {
  useEffect(()=>{

  }, [props])
  const columnHelper = createColumnHelper<SampleDto>();
  const columns = [
    columnHelper.accessor("code", {
      header: "Code",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("project", {
      header: "Project Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("createdAtUtc", {
      header: "Created At",
      cell: (info) => {
        const date: Date = new Date(info.getValue());
        return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
      },
    }),
    columnHelper.accessor("comment", {
      header: "Comment",
      cell: (info) => info.getValue(),

    }),
  ];

  const table = useReactTable({
    columns: columns,
    data: props.dataQuery.data?.rows ?? [],
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting: props.sorting,
      pagination: props.pagination,
    },
    rowCount: props.dataQuery.data?.rowsAmount ?? 0,
    onSortingChange: props.setSorting,
    onPaginationChange: props.setPagination,
    manualSorting: true,
    manualPagination: true,
  });

  const handleClick = (id: string | null | undefined) => {
    props.onChangeSampleDetails?.(id?.toString() ?? "");
  };

  if (props.dataQuery.isLoading)
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );

  return (
      <div className="h-[40rem] flex flex-col">
        <div className="flex-1 overflow-auto">
          <SamplesTable table={table} handleClickSample={handleClick} />
        </div>
        <SamplesTableManage table={table} />
      </div>

  );
};

export default Samples;
