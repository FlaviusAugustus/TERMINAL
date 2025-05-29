import { SampleDto } from "@api/terminalSchemas";
import {
  EntityAmountCard,
  EntityAmountCardButton,
} from "@components/Dashboard/EntityAmountCard";
import TableCard from "@components/Shared/Table/TableCard";
import TableManagement from "@components/Shared/Table/TableManagment";
import TableView from "@components/Shared/Table/TableView";
import { useGetProjectAmount } from "@hooks/projects/useGetProjectAmount";
import { useGetRecipeAmount } from "@hooks/recipes/useGetRecipeAmount";
import useGetRecentSamples from "@hooks/samples/useGetRecentSamples";
import { useGetSampleAmount } from "@hooks/samples/useSampleAmount";
import { useGetUserAmount } from "@hooks/users/useUserAmount";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

const columnHelper = createColumnHelper<SampleDto>();

const recipeColumns = [
  columnHelper.accessor("code", {
    header: "Code",
    cell: (info) => info.getValue(),
  }),
];

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
      return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    },
  }),
  columnHelper.accessor("comment", {
    header: "Comment",
    cell: (info) => info.getValue(),
  }),
];

const DashboardPage = () => {
  const { data: projectAmount } = useGetProjectAmount();
  const { data: sampleAmount } = useGetSampleAmount();
  const { data: recipesAmount } = useGetRecipeAmount();
  const { data: userAmount } = useGetUserAmount();
  const { data: recentSamples } = useGetRecentSamples(14);

  const navigate = useNavigate();

  const recipeTable = useReactTable({
    columns: recipeColumns,
    data: recentSamples?.data.recentSamples ?? [],
    getCoreRowModel: getCoreRowModel(),
    rowCount: recentSamples?.data.recentSamples.length,
    manualSorting: true,
    manualPagination: true,
  });

  const table = useReactTable({
    columns: columns,
    data: recentSamples?.data.recentSamples ?? [],
    getCoreRowModel: getCoreRowModel(),
    rowCount: recentSamples?.data.recentSamples.length,
    manualSorting: true,
    manualPagination: true,
  });

  return (
    <div className="p-3 h-full w-full">
      <p className="p-2 text-md">Stats</p>
      <div className="md:grid md:grid-cols-4 flex flex-col gap-3">
        <EntityAmountCard
          title="Total projects"
          amount={projectAmount?.data ?? 0}
        >
          <EntityAmountCardButton
            title="Browse All"
            onClick={() => navigate("/projects")}
          />
          <EntityAmountCardButton title="Add New" />
        </EntityAmountCard>

        <EntityAmountCard
          title="Total samples"
          amount={sampleAmount?.data ?? 0}
        >
          <EntityAmountCardButton
            title="Browse All"
            onClick={() => navigate("/samples")}
          />
          <EntityAmountCardButton title="Add New" />
        </EntityAmountCard>

        <EntityAmountCard
          title="Total recipes"
          amount={recipesAmount?.data ?? 0}
        >
          <EntityAmountCardButton
            title="Browse All"
            onClick={() => navigate("/recipes")}
          />
          <EntityAmountCardButton title="Add New" />
        </EntityAmountCard>

        <EntityAmountCard title="Total users" amount={userAmount?.data ?? 0}>
          <EntityAmountCardButton title="Browse All" />
          <EntityAmountCardButton title="Invite new" />
        </EntityAmountCard>

        <div className="col-span-2">
          <p className="p-2 text-md">Recent Samples</p>
          <TableCard>
            <TableView<SampleDto> table={table} handleClickRow={() => {}} />
          </TableCard>
        </div>

        <div className="col-span-1">
          <p className="p-2 text-md">Recent Recipes</p>
          <TableCard>
            <TableView<SampleDto>
              table={recipeTable}
              handleClickRow={() => {}}
            />
          </TableCard>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
