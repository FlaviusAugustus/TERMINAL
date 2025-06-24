import { Sample } from "@api/models/Sample";
import {
  EntityAmountCard,
  EntityAmountCardButton,
} from "@components/Dashboard/EntityAmountCard";
import Chip from "@components/Shared/Chip";
import IconButton from "@components/Shared/IconButton";
import TableCard from "@components/Shared/Table/TableCard";
import TableView from "@components/Shared/Table/TableView";
import { TagIcon } from "@heroicons/react/24/outline";
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

const columnHelper = createColumnHelper<Sample>();

const recipeColumns = [
  columnHelper.accessor("code", {
    header: "Code",
    cell: (info) => (
      <div className="flex items-center justify-between">
        {info.getValue()}
        <div className="relative">
          <div className="flex items-center justify-center absolute top-0 right-1 -translate-y-1/2">
            <IconButton className="!p-1 border-none hover:bg-gray-200 flex items-center justify-center">
              <TagIcon className="h-4" />
            </IconButton>
          </div>
        </div>
      </div>
    ),
  }),
];

const columns = [
  columnHelper.accessor("code", {
    header: "Code",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("project", {
    header: "Project Name",
    cell: (info) => <Chip value={info.getValue()} />,
  }),
  columnHelper.accessor("createdAtUtc", {
    header: "Created At",
    cell: (info) => new Date(info.getValue()).toDateString(),
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
    <>
      <div className="md:grid md:grid-cols-4 flex flex-col gap-3 p-3">
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
            <TableView<Sample> table={table} handleClickRow={() => {}} />
          </TableCard>
        </div>

        <div className="col-span-1">
          <p className="p-2 text-md">Pinned Recipes</p>
          <TableCard>
            <TableView<Sample> table={recipeTable} handleClickRow={() => {}} />
          </TableCard>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
