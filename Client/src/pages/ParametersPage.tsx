import TableLayout from "./layouts/TableLayout";
import ComponentOrLoader from "@components/shared/loader/ComponentOrLoader.tsx";
import Loader from "@components/shared/loader/Loader.tsx";
import Parameters from "@components/parameters/Parameters.tsx";
import ParameterDetails from "@components/parameters/ParameterDetails.tsx";
import { useCallback, useState } from "react";
import { AllParameters } from "@api/models/Parameters.ts";
import DialogLoader from "@components/shared/dialog/DialogLoader.tsx";
import { useDeactivateParameter } from "@hooks/parameters/useDeactivateParameter.ts";
import { toastError } from "@utils/toast.utils.tsx";
import ConfirmDeleteDialog from "@components/shared/dialog/ConfirmDeleteDialog.tsx";
import useGetAllParameters from "@hooks/parameters/useGetAllParameters.ts";

const ParametersPage = () => {
  const dataParameters = useGetAllParameters();
  const mutation = useDeactivateParameter();

  const [parameterDetails, setParameterDetails] = useState<
    AllParameters | undefined
  >(undefined);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteParametersIds, setDeleteParametersIds] = useState<
    string[] | null
  >(null);

  const openDeleteDialog = (id: string | string[]) => {
    const ids = Array.isArray(id) ? id : [id];
    setDeleteOpen(true);
    setDeleteParametersIds(ids);
  };

  const handleParameterDetails = useCallback(
    (id: string) => {
      setDetailsOpen(true);
      const paramDetails = dataParameters.data?.parameters.find(
        (param) => param.id === id
      );
      setParameterDetails(paramDetails);
    },
    [dataParameters.data?.parameters?.length]
  );

  const handleDelete = async (ids: string[] | null) => {
    if (!ids || ids.length === 0) return;
    try {
      await Promise.all(ids.map((id) => mutation.mutateAsync(id)));
      setDeleteOpen(false);
      setDeleteParametersIds(null);
    } catch {
      toastError("Error deleting parameter(s)");
    }
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
          onDelete={openDeleteDialog}
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
        <ConfirmDeleteDialog
          onSubmit={() => handleDelete(deleteParametersIds)}
          isSubmitting={mutation.isPending}
          isOpen={deleteOpen}
          description={`Disabling this parameter will deactivate it — associated data will not be permanently deleted and the parameter can be re-enabled later. Type 'delete' to confirm.`}
          setIsOpen={setDeleteOpen}
        />
      </ComponentOrLoader>
    </TableLayout>
  );
};

export default ParametersPage;
