import TableLayout from "./layouts/TableLayout";
import ComponentOrLoader from "@components/Shared/ComponentOrLoader.tsx";
import Loader from "@components/Shared/Loader.tsx";
import {PaginationState} from "@tanstack/react-table";
import useGetParameters from "@hooks/useGetParameters.ts";
import Parameters from "@components/Parameters/Parameters.tsx";

const paginationState: PaginationState = {
    pageIndex: 0,
    pageSize: 99,
}

const ParametersPage = () => {

    const dataParameters = useGetParameters();

  return (
    <TableLayout>
      <ComponentOrLoader
        isLoading={dataParameters.isLoading}
        loader={<Loader />}
      >
        <Parameters
          parameters={dataParameters?.data?.parameters || []}
          // sorting={sorting}
          pagination={paginationState}
          // setSorting={setSorting}
        />
      </ComponentOrLoader>
      {/*<ComponentOrLoader*/}
      {/*  isLoading={dataQuerySampleDetails.isLoading}*/}
      {/*  loader={<Loader />}*/}
      {/*>*/}
      {/*  <SampleDetails*/}
      {/*    sample={dataQuerySampleDetails.data}*/}
      {/*    open={detailsOpen}*/}
      {/*    openChange={setDetailsOpen}*/}
      {/*  />*/}
      {/*</ComponentOrLoader>*/}
    </TableLayout>
  );
};

export default ParametersPage;
