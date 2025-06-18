import TableLayout from "./layouts/TableLayout";
import ComponentOrLoader from "@components/Shared/ComponentOrLoader.tsx";
import Loader from "@components/Shared/Loader.tsx";
import useGetParameters from "@hooks/parameters/useGetParameters.ts";
import Parameters from "@components/Parameters/Parameters.tsx";
import ParameterDetails from "@components/Parameters/ParameterDetails.tsx";
import {useState} from "react";
import {AllParameters} from "@api/models/Parameters.ts";

const ParametersPage = () => {

    const dataParameters = useGetParameters();

    const [parameterDetails, setParameterDetails] = useState<AllParameters | undefined>(undefined);
    const [detailsOpen, setDetailsOpen] = useState(false);

    const changeParameterDetails = (id: string) => {
        setDetailsOpen(true);
        const paramDetails = dataParameters.data?.parameters.find((param) => param.id === id);
        setParameterDetails(paramDetails);
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
          parameter={parameterDetails}
          open={detailsOpen}
          openChange={setDetailsOpen}
        />
      </ComponentOrLoader>
    </TableLayout>
  );
};

export default ParametersPage;
