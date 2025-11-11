import TableLayout from "./layouts/TableLayout";
import ComponentOrLoader from "@components/shared/loader/ComponentOrLoader.tsx";
import Loader from "@components/shared/loader/Loader.tsx";
import Parameters from "@components/parameters/Parameters.tsx";
import ParameterDetails from "@components/parameters/ParameterDetails.tsx";
import { useState } from "react";
import { AllParameters } from "@api/models/Parameters.ts";
import DialogLoader from "@components/shared/dialog/DialogLoader.tsx";
import { useDeactivateParameter } from "@hooks/parameters/useDeactivateParameter.ts";
import { toastError } from "@utils/toast.utils.tsx";
import ConfirmDeleteDialog from "@components/shared/dialog/ConfirmDeleteDialog.tsx";
import useGetAllParameters from "@hooks/parameters/useGetAllParameters.ts";
import ParameterEdit from "@components/parameters/ParameterEdit.tsx";
import { useActivateParameter } from "@hooks/parameters/useActivateParameter.ts";

const ParametersPage = () => {
  const dataParameters = useGetAllParameters();
  const deactivateParameter = useDeactivateParameter();
  const activateParameter = useActivateParameter();

  const [parameterDetails, setParameterDetails] = useState<
    AllParameters | undefined
  >(undefined);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteParametersIds, setDeleteParametersIds] = useState<
    string[] | null
  >(null);

  const handleParameterDetails = (id: string) => {
    setDetailsOpen(true);
    const paramDetails = dataParameters.data?.parameters.find(
      (param) => param.id === id
    );
    setParameterDetails(paramDetails);
  };

  const handleEdit = (id: string) => {
    setEditOpen(true);
    const paramDetails = dataParameters.data?.parameters.find(
      (param) => param.id === id
    );
    setParameterDetails(paramDetails);
  };

  const openDeleteDialog = (id: string | string[]) => {
    const ids = Array.isArray(id) ? id : [id];
    setDeleteOpen(true);
    setDeleteParametersIds(ids);
  };

  const handleDelete = async (ids: string[] | null) => {
    if (!ids || ids.length === 0) return;
    try {
      await Promise.all(ids.map((id) => deactivateParameter.mutateAsync(id)));
      setDeleteOpen(false);
      setDeleteParametersIds(null);
    } catch {
      toastError("Error deleting parameter(s)");
    }
  };

  const handleSubmit = async (id: string, isActive: boolean) => {
    try {
      if (isActive) {
        await activateParameter.mutateAsync(id);
      } else {
        await deactivateParameter.mutateAsync(id);
      }
      setEditOpen(false);
    } catch {
      toastError("Error changing status");
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
          onEdit={handleEdit}
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
        <ParameterEdit
          parameter={parameterDetails}
          onSubmit={handleSubmit}
          open={editOpen}
          setOpen={setEditOpen}
          isSubmitting={
            activateParameter.isPending || deactivateParameter.isPending
          }
        />
        <ConfirmDeleteDialog
          onSubmit={() => handleDelete(deleteParametersIds)}
          isSubmitting={deactivateParameter.isPending}
          isOpen={deleteOpen}
          description={`Disabling this parameter will deactivate it — associated data will not be permanently deleted and the parameter can be re-enabled later. Type 'delete' to confirm.`}
          setIsOpen={setDeleteOpen}
        />
      </ComponentOrLoader>
    </TableLayout>
  );
};

export default ParametersPage;
