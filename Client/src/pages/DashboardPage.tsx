import { Process } from "@api/models/Process.ts";
import TableCard from "@components/shared/table/TableCard";
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
    <div className="md:grid md:grid-cols-4 flex flex-col gap-3 p-3 overflow-auto">
      <div className="col-span-4">
        <p className="px-2 text-md">Stats</p>
      </div>
      <Stats />
      <div className="col-span-2">
        <p className="p-2 text-md">Recent Processes</p>
        <TableCard>
          <TableView<Process> table={table} handleClickRow={() => {}} />
        </TableCard>
      </div>
      <div className="col-span-2">
        <p className="p-2 text-md">Last 30 days</p>
        <TableCard>
          <ProcessChart />
        </TableCard>
      </div>
    </div>
  );
};

export default DashboardPage;
