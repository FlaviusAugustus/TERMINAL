import { Process } from "@api/models/Process.ts";
import {
  EntityAmountCard,
  EntityAmountCardButton,
} from "@components/dashboard/EntityAmountCard";
import TableCard from "@components/shared/table/TableCard";
import TableView from "@components/shared/table/TableView";
import { useGetProjectAmount } from "@hooks/projects/useGetProjectAmount";
import { useGetRecipeAmount } from "@hooks/recipes/useGetRecipeAmount";
import useGetRecentProcesses from "@hooks/processes/useGetRecentProcesses.ts";
import { useGetProcessAmount } from "@hooks/processes/useProcessAmount.ts";
import { useGetUserAmount } from "@hooks/users/useUserAmount";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

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
  const { data: projectAmount } = useGetProjectAmount();
  const { data: sampleAmount } = useGetProcessAmount();
  const { data: recipesAmount } = useGetRecipeAmount();
  const { data: userAmount } = useGetUserAmount();
  const { data: recentSamples } = useGetRecentProcesses(14);

  const navigate = useNavigate();

  const table = useReactTable({
    columns: columns,
    data: recentSamples?.data.recentSamples ?? [],
    getCoreRowModel: getCoreRowModel(),
    rowCount: recentSamples?.data.recentSamples.length,
    manualSorting: true,
    manualPagination: true,
  });

  return (
    <>
      <div className="md:grid md:grid-cols-4 flex flex-col gap-3 p-3 overflow-auto">
        <div className="col-span-4">
          <p className="px-2 text-md">Stats</p>
        </div>
        <EntityAmountCard
          title="Total projects"
          amount={projectAmount?.data ?? 0}
        >
          <EntityAmountCardButton
            title="Browse All"
            onClick={() => navigate("/projects")}
          />
          <EntityAmountCardButton
            title="Add New"
            onClick={() => navigate("/new-project")}
          />
        </EntityAmountCard>

        <EntityAmountCard
          title="Total samples"
          amount={sampleAmount?.data ?? 0}
        >
          <EntityAmountCardButton
            title="Browse All"
            onClick={() => navigate("/processes")}
          />
          <EntityAmountCardButton
            title="Add New"
            onClick={() => navigate("/new-process")}
          />
        </EntityAmountCard>

        <EntityAmountCard
          title="Total recipes"
          amount={recipesAmount?.data ?? 0}
        >
          <EntityAmountCardButton
            title="Browse All"
            onClick={() => navigate("/recipes")}
          />
          <EntityAmountCardButton
            title="Add New"
            onClick={() => navigate("/new-recipe")}
          />
        </EntityAmountCard>

        <EntityAmountCard title="Total users" amount={userAmount?.data ?? 0}>
          <EntityAmountCardButton title="Browse All" />
          <EntityAmountCardButton title="Invite new" />
        </EntityAmountCard>

        <div className="col-span-2">
          <p className="p-2 text-md">Recent Processes</p>
          <TableCard>
            <TableView<Process> table={table} handleClickRow={() => {}} />
          </TableCard>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
