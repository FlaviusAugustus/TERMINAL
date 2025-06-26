import TableLayout from "@pages/layouts/TableLayout.tsx";
import Loader from "@components/Shared/Loader.tsx";
import ComponentOrLoader from "@components/Shared/ComponentOrLoader.tsx";
import Tags from "@components/Tags/Tags.tsx";
import {useState} from "react";
import {PaginationState, SortingState} from "@tanstack/react-table";
import {useGetAllTags} from "@hooks/tags/useGetAllTags.ts";


const TagsPage = () => {

    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const queryTags = useGetAllTags({
        pageNumber: pagination.pageIndex,
        pageSize: pagination.pageSize,
        desc: sorting[0]?.desc ?? true
    })

    // useEffect(() => {
    //     console.log(queryTags)
    // }, [queryTags]);

    return (
      <TableLayout>
          <ComponentOrLoader
            isLoading={queryTags.isLoading}
            loader={<Loader/>}
          >
              <Tags
                tags={queryTags.data}
                sorting={sorting}
                setSorting={setSorting}
                pagination={pagination}
                setPagination={setPagination}
                // onChangeProjectDetails={() => {
                // }}
                // onDetails={handleDetails}
                // onDelete={handleDelete}
              />
          </ComponentOrLoader>
          {/*<ComponentOrLoader*/}
          {/*  isLoading={queryProjectDetails.isLoading}*/}
          {/*  loader={<Loader/>}*/}
          {/*>*/}
          {/*    <TagDetails*/}
          {/*      project={queryProjectDetails.data!}*/}
          {/*      onSubmit={handleSubmit}*/}
          {/*      open={detailsOpen}*/}
          {/*      setOpen={setDetailsOpen}*/}
          {/*    />*/}
          {/*</ComponentOrLoader>*/}
      </TableLayout>
    );
};

export default TagsPage;