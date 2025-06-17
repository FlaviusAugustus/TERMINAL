import TableLayout from "./layouts/TableLayout";
import ComponentOrLoader from "@components/Shared/ComponentOrLoader.tsx";
import Loader from "@components/Shared/Loader.tsx";
import useGetParameters from "@hooks/parameters/useGetParameters.ts";
import Parameters from "@components/Parameters/Parameters.tsx";
import ParameterDetails from "@components/Parameters/ParameterDetails.tsx";
import {useState} from "react";
import {useGetParameterDetails} from "@hooks/parameters/useGetParameterDetails.ts";

const ParametersPage = () => {

    const dataParameters = useGetParameters();

    const [parameterDetailsId, setParameterDetailsId] = useState<string | null>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const dataParametersDetails = useGetParameterDetails(parameterDetailsId);

    const changeParameterDetails = (id: string) => {
        setDetailsOpen(true);
        console.log(dataParametersDetails)
        setParameterDetailsId(id);
    };

  return (
    <TableLayout>
      <ComponentOrLoader
        isLoading={dataParameters.isLoading}
        loader={<Loader />}
      >
        <Parameters
          parameters={dataParameters?.data?.parameters || []}
          onEdit={changeParameterDetails}
        />
      </ComponentOrLoader>
      <ComponentOrLoader
        isLoading={dataParameters.isLoading}
        loader={<Loader />}
      >
        <ParameterDetails
          parameter={dataParametersDetails.data}
          open={detailsOpen}
          openChange={setDetailsOpen}
        />
      </ComponentOrLoader>
    </TableLayout>
  );
};

export default ParametersPage;
