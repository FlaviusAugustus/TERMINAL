import TableLayout from "./layouts/TableLayout";
import ComponentOrLoader from "@components/Shared/ComponentOrLoader.tsx";
import Loader from "@components/Shared/Loader.tsx";
import useGetParameters from "@hooks/useGetParameters.ts";
import Parameters from "@components/Parameters/Parameters.tsx";

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
