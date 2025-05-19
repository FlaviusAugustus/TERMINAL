import {
    createColumnHelper,
    getCoreRowModel,
    OnChangeFn,
    PaginationState,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import {ProjectDto} from "@api/terminalSchemas.ts";
import {ProjectsResponse} from "@hooks/projects/useGetProjects.ts";
import TableView from "@components/Shared/Table/TableView.tsx";
import TableManagement from "@components/Shared/Table/TableManagment.tsx";
import TableCard from "@components/Shared/Table/TableCard";

export interface ProjectsProps {
    dataQuery: ProjectsResponse | undefined;
    sorting: SortingState;
    setSorting: OnChangeFn<SortingState>;
    pagination: PaginationState;
    setPagination: OnChangeFn<PaginationState>;
    onChangeProjectDetails: (id: string) => void;
}

const columnHelper = createColumnHelper<ProjectDto>();
const columns = [
    columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => info.getValue(),
    }),
];

const Projects = (props: ProjectsProps) => {
    const table = useReactTable({
        columns: columns,
        data: props.dataQuery?.rows ?? [],
        getCoreRowModel: getCoreRowModel(),
        state: {
            sorting: props.sorting,
            pagination: props.pagination,
        },
        rowCount: props.dataQuery?.rowsAmount ?? 0,
        onSortingChange: props.setSorting,
        onPaginationChange: props.setPagination,
        manualSorting: true,
        manualPagination: true,
    });

    const handleClick = (id: string | null | undefined) => {
        props.onChangeProjectDetails?.(id?.toString() ?? "");
    };

    return (
        <TableCard>
            <TableView<ProjectDto> table={table} handleClickRow={handleClick}/>
            <TableManagement<ProjectDto> table={table}/>
        </TableCard>
    );
};

export default Projects;
