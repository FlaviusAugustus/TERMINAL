import { SampleDto } from "../../api/terminalSchemas";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import SamplesTable from "./SamplesTable";
import {
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
  SortingState,
  PaginationState,
} from "@tanstack/react-table";
import SamplesTableManage from "./SamplesTableManage";

const samplesData: SampleDto[] = Array.from({ length: 100 }, (_, i) => ({
  code: `AS${i + 1}`,
  projectName: "TEST",
  createdAt: new Date(2021, 8, i + 1),
}));

async function fetchData(options: {
  pageIndex: number;
  pageSize: number;
  sorting?: SortingState;
}) {
  await new Promise((r) => setTimeout(r, 500));
  console.log("FETCH DATA", options);

  return {
    rows: samplesData.slice(
      options.pageIndex * options.pageSize,
      (options.pageIndex + 1) * options.pageSize,
    ),
    pageCount: Math.ceil(samplesData.length / options.pageSize),
    rowCount: samplesData.length,
  };
}

export interface SamplesProps {
  onChangeSampleDetails?: (code: string) => void;
}

export interface SamplesQueryResponse {
  rows: SampleDto[];
  rowCount: number;
  pageCount: number;
}

const Samples = (props: SamplesProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const dataQuery = useQuery<SamplesQueryResponse>({
    queryKey: ["samples", sorting, pagination],
    queryFn: () => fetchData({ ...pagination, sorting: sorting }),
    placeholderData: keepPreviousData,
  });

  const columnHelper = createColumnHelper<SampleDto>();

  const columns = [
    columnHelper.accessor("code", {
      header: "Code",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("projectName", {
      header: "Project Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("createdAt", {
      header: "Created At",
      cell: (info) => info.getValue()?.toLocaleDateString(),
    }),
  ];

  const table = useReactTable({
    columns: columns,
    data: dataQuery.data?.rows ?? [],
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
      pagination,
    },
    rowCount: dataQuery.data?.rowCount,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    manualSorting: true,
    manualPagination: true,
  });

  const handleClick = (code: string | null | undefined) => {
    props.onChangeSampleDetails?.(code?.toString() ?? "");
  };

  if (dataQuery.isLoading)
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );

  return (
    <div className="flex flex-col justify-center">
      <SamplesTable table={table} handleClickSample={handleClick} />
      <SamplesTableManage table={table} />
    </div>
  );
};

export default Samples;
