import { Process } from "@api/models/Process.ts";
import TableView from "@components/shared/table/TableView";
import useGetRecentProcesses from "@hooks/processes/useGetRecentProcesses.ts";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import ProcessChart from "@components/dashboard/ProcessChart";
import Stats from "@components/dashboard/Stats.tsx";

const columnHelper = createColumnHelper<Process>();

const columns = [
  columnHelper.accessor("code", {
    header: "Code",
    cell: (info) => info.getValue().prefix + info.getValue().sequentialNumber,
  }),
  columnHelper.accessor("createdAtUtc", {
    header: "Created At",
    cell: (info) => new Date(info.getValue()).toDateString(),
  }),
];
const DashboardPage = () => {
  const { data: recentSamples } = useGetRecentProcesses(14);

  const table = useReactTable({
    columns: columns,
    data: recentSamples?.data.recentSamples ?? [],
    getCoreRowModel: getCoreRowModel(),
    rowCount: recentSamples?.data.recentSamples.length,
    manualSorting: true,
    manualPagination: true,
  });

  return (
    <div className="flex flex-1 overflow-auto">
      <div className="h-full w-full md:grid md:grid-cols-4 md:grid-rows-[auto_auto_1fr] gap-3 p-3">
        <div className="col-span-4">
          <p className="px-2 text-md">Stats</p>
        </div>
        <Stats />
        <div className="col-span-2 flex flex-col overflow-auto">
          <p className="p-2 text-md flex-shrink-0">Recent Processes</p>
          <div className="h-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-sm flex-1">
            <TableView<Process> table={table} handleClickRow={() => {}} />
          </div>
        </div>
        <div className="col-span-2 flex flex-col overflow-auto">
          <p className="p-2 text-md flex-shrink-0">
            Number of new Processes in the last 30 days
          </p>
          <div className="h-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-sm flex-1">
            <ProcessChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
