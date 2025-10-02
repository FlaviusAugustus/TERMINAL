import TableLayout from "./layouts/TableLayout";
import ComponentOrLoader from "@components/shared/loader/ComponentOrLoader.tsx";
import Loader from "@components/shared/loader/Loader.tsx";
import useGetParameters from "@hooks/parameters/useGetParameters.ts";
import Parameters from "@components/parameters/Parameters.tsx";
import ParameterDetails from "@components/parameters/ParameterDetails.tsx";
import { useState } from "react";
import { AllParameters } from "@api/models/Parameters.ts";
import DialogLoader from "@components/shared/dialog/DialogLoader.tsx";
import { useDeactivateParameter } from "@hooks/parameters/useDeactivateParameter.ts";
import { toastPromise } from "@utils/toast.utils.tsx";

const ParametersPage = () => {
  const dataParameters = useGetParameters();
  const { mutateAsync } = useDeactivateParameter();

  const [parameterDetails, setParameterDetails] = useState<
    AllParameters | undefined
  >(undefined);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleParameterDetails = (id: string) => {
    setDetailsOpen(true);
    const paramDetails = dataParameters.data?.parameters.find(
      (param) => param.id === id
    );
    setParameterDetails(paramDetails);
  };

  const handleDelete = async (id: string) => {
    if (!id) return;
    await toastPromise(mutateAsync(id), {
      loading: "Deleting parameter...",
      success: "Deletion successful",
      error: "Deletion failed",
    });
  };

  return (
    <TableLayout>
      <ComponentOrLoader
        isLoading={dataParameters.isLoading}
        loader={<Loader />}
      >
        <Parameters
          parameters={dataParameters?.data?.parameters || []}
          onDetails={handleParameterDetails}
          onDelete={handleDelete}
        />
      </ComponentOrLoader>
      <ComponentOrLoader
        isLoading={dataParameters.isLoading}
        loader={<DialogLoader />}
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
