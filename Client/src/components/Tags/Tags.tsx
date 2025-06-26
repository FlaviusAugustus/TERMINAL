import {
    ColumnDef,
    createColumnHelper,
    getCoreRowModel, OnChangeFn,
    PaginationState,
    SortingState,
    useReactTable
} from "@tanstack/react-table";
import {Tag} from "@api/models/Tag.ts";
import {useState} from "react";
import {useTableColumns} from "@hooks/useTableColumns.tsx";
import {XMarkIcon} from "@heroicons/react/24/outline";
import VisibleForRoles from "@components/Shared/VisibleForRoles.tsx";
import IconButton from "@components/Shared/IconButton.tsx";
import TableCard from "@components/Shared/Table/TableCard.tsx";
import TableView from "@components/Shared/Table/TableView.tsx";
import TableManagement from "@components/Shared/Table/TableManagment.tsx";
import {TagsResponse} from "@hooks/tags/useGetAllTags.ts";


export interface TagProps {
    // onChangeTagDetails: (id: string) => void;
    tags: TagsResponse | undefined;
    sorting: SortingState;
    pagination: PaginationState;
    setSorting: OnChangeFn<SortingState>;
    setPagination: OnChangeFn<PaginationState>;
    // onDetails: (tagId: string) => void;
    // onDelete: (tagId: string) => void;
}

const columnHelper = createColumnHelper<Tag>();

const columnsDef = [
    columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => info.getValue(),
    }),
] as Array<ColumnDef<Tag, unknown>>;


/**
 * Tag Component
 *
 * A component that displays a list of tags in a table format.
 * It allows sorting and pagination of the tag data.
 *
 * @component
 */
const Tags = (props: TagProps) => {
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

    const columns = useTableColumns<Tag>({
        columnsDef: columnsDef,
        // onDetails: props.onDetails,
        // onDelete: props.onDelete,
    });

    const table = useReactTable({
        columns: columns,
        data: props.tags?.rows ?? [],
        getCoreRowModel: getCoreRowModel(),
        defaultColumn: {
            size: "auto" as unknown as number,
        },
        state: {
            sorting: props.sorting,
            pagination: props.pagination,
            rowSelection: rowSelection,
        },
        getRowId: (row) => row.id,
        onRowSelectionChange: setRowSelection,
        enableMultiRowSelection: true,
        rowCount: props.tags?.rowsAmount ?? 0,
        onSortingChange: props.setSorting,
        onPaginationChange: props.setPagination,
        manualSorting: true,
        manualPagination: true,
    });

    // const handleClick = (id: string | null | undefined) => {
    //     props.onChangeTagDetails?.(id?.toString() ?? "");
    // };
    //
    // const handleDeleteSelected = () => {
    //     table.getSelectedRowModel().rows.forEach((row) => {
    //         props.onDelete(row.original.id);
    //     });
    // };
    return (
      <>
          <div className="flex justify-between gap-1 items-end pb-3 h-14">
              {/*<InputField*/}
              {/*  className="!text-sm !h-[40px]"*/}
              {/*  placeholder="Search"*/}
              {/*  icon={<MagnifyingGlassIcon className="h-4"/>}*/}
              {/*/>*/}
              <VisibleForRoles roles={["Administrator", "Moderator"]}>
                  <div className="flex gap-1">
                      <IconButton
                        // onClick={handleDeleteSelected}
                        disabled={
                            !(table.getIsSomeRowsSelected() || table.getIsAllRowsSelected())
                        }
                        className="h-[40px] flex bg-white items-center gap-1 !hover:border-red-200"
                      >
                          <XMarkIcon className="h-4 "/>
                          <p className="text-xs">Delete Selected</p>
                      </IconButton>
                      {/*<Link to="/new-project">*/}
                      {/*    <IconButton className="h-[40px] flex bg-white items-center gap-1">*/}
                      {/*        <PlusIcon className="h-4" />*/}
                      {/*        <p className="text-xs">Add new</p>*/}
                      {/*    </IconButton>*/}
                      {/*</Link>*/}
                  </div>
              </VisibleForRoles>
          </div>
          <TableCard className="!h-full">
              <TableView<Tag> table={table}/>
              <TableManagement<Tag> table={table}/>
          </TableCard>
      </>
    );
};

export default Tags;