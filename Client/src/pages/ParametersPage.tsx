import TableLayout from "./layouts/TableLayout";
import ComponentOrLoader from "@components/Shared/ComponentOrLoader.tsx";
import Loader from "@components/Shared/Loader.tsx";
import useGetParameters from "@hooks/parameters/useGetParameters.ts";
import Parameters from "@components/Parameters/Parameters.tsx";
import ParameterDetails from "@components/Parameters/ParameterDetails.tsx";

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
      <ComponentOrLoader
        isLoading={dataParameters.isLoading}
        loader={<Loader />}
      >
        <ParameterDetails
          // sample={dataParameters.data}
          // open={detailsOpen}
          // openChange={setDetailsOpen}
        />
      </ComponentOrLoader>
    </TableLayout>
  );
};

export default ParametersPage;
