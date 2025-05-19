import {
    createColumnHelper,
    getCoreRowModel,
    OnChangeFn,
    PaginationState,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import {RecipesResponse} from "@hooks/recipes/useGetRecipes.ts";
import {ProjectDto, RecipeDto, SampleDto} from "@api/terminalSchemas.ts";
import TableView from "@components/Shared/Table/TableView.tsx";
import TableManagement from "@components/Shared/Table/TableManagment.tsx";
import TableCard from "@components/Shared/Table/TableCard";

export interface RecipesProps {
    dataQuery: RecipesResponse | undefined;
    sorting: SortingState;
    setSorting: OnChangeFn<SortingState>;
    pagination: PaginationState;
    setPagination: OnChangeFn<PaginationState>;
    onChangeRecipeDetails: (id: string) => void;
}

const columnHelper = createColumnHelper<ProjectDto | SampleDto | RecipeDto>();

const columns = [
    columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => info.getValue(),
    }),
];

const Recipes = (props: RecipesProps) => {
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
        props.onChangeRecipeDetails?.(id?.toString() ?? "");
    };

    return (
        <TableCard>
            <TableView table={table} handleClickRow={handleClick}/>
            <TableManagement table={table}/>
        </TableCard>
    );
};

export default Recipes;
