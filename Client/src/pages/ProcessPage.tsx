import { useState } from "react";
import { PaginationState, SortingState } from "@tanstack/react-table";
import Processes from "@components/processes/Processes.tsx";
import SampleDetails from "@components/processes/SampleDetails.tsx";
import { useProcesses } from "@hooks/processes/useGetProcesses.ts";
import { useSampleDetails } from "@hooks/processes/useGetProcessDetails.ts";
import { useDeleteSample } from "@hooks/processes/useDeleteSample.ts";
import TableLayout from "./layouts/TableLayout";
import Loader from "@components/shared/loader/Loader.tsx";
import ComponentOrLoader from "@components/shared/loader/ComponentOrLoader.tsx";
import EditSample from "@components/processes/EditSample";
import DialogLoader from "@components/shared/dialog/DialogLoader.tsx";
import { toastError } from "@utils/toast.utils.tsx";
import ConfirmDeleteDialog from "@components/shared/dialog/ConfirmDeleteDialog.tsx";

const ProcessPage = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [searchPhrase, setSearchPhrase] = useState("");

  const samplesQuery = useProcesses({
    pageNumber: pagination.pageIndex,
    pageSize: pagination.pageSize,
    orderBy: sorting[0]?.id ?? "",
    desc: sorting[0]?.desc ?? true,
    searchPhrase,
  });

  const deleteMutation = useDeleteSample({
    pageNumber: pagination.pageIndex,
    pageSize: pagination.pageSize,
    orderBy: sorting[0]?.id ?? "",
    desc: sorting[0]?.desc ?? true,
  });

  const [sampleDetailsId, setSampleDetailsId] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const dataQuerySampleDetails = useSampleDetails(sampleDetailsId);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteSamplesIds, setDeleteSamplesIds] = useState<string[] | null>(
    null
  );

  const openDeleteDialog = (id: string | string[]) => {
    const ids = Array.isArray(id) ? id : [id];
    setDeleteOpen(true);
    setDeleteSamplesIds(ids);
  };

  const changeSampleDetails = (id: string) => {
    setSampleDetailsId(id);
    setDetailsOpen(true);
  };

  const editSampleDetails = (id: string) => {
    setSampleDetailsId(id);
    setEditOpen(true);
  };

  const handleDelete = async (ids: string[] | null) => {
    if (!ids || ids.length === 0) return;
    try {
      await Promise.all(ids.map((id) => deleteMutation.mutateAsync(id)));
      setDeleteOpen(false);
      setDeleteSamplesIds(null);
    } catch {
      toastError("Error deleting sample(s)");
    }
  };

  return (
    <TableLayout>
      <ComponentOrLoader isLoading={samplesQuery.isLoading} loader={<Loader />}>
        <Processes
          processes={samplesQuery.data}
          sorting={sorting}
          pagination={pagination}
          setSorting={setSorting}
          setPagination={setPagination}
          onDelete={openDeleteDialog}
          onDetails={changeSampleDetails}
          onEdit={editSampleDetails}
          searchProps={{
            onSearch: setSearchPhrase,
            searchValue: searchPhrase,
            onClearSearch: () => setSearchPhrase(""),
          }}
        />
      </ComponentOrLoader>
      <ComponentOrLoader
        isLoading={
          dataQuerySampleDetails.isLoading || dataQuerySampleDetails.isFetching
        }
        loader={<DialogLoader />}
      >
        <EditSample
          sample={dataQuerySampleDetails.data}
          open={editOpen}
          openChange={setEditOpen}
        />
        <SampleDetails
          sample={dataQuerySampleDetails.data}
          open={detailsOpen}
          openChange={setDetailsOpen}
        />
        <ConfirmDeleteDialog
          onSubmit={() => handleDelete(deleteSamplesIds)}
          isSubmitting={deleteMutation.isPending}
          isOpen={deleteOpen}
          description={`Deleting this sample(s) is irreversible and will remove all associated data. Type delete to confirm.`}
          setIsOpen={setDeleteOpen}
        />
      </ComponentOrLoader>
    </TableLayout>
  );
};

export default ProcessPage;
