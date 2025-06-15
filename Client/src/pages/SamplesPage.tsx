import { useState } from "react";
import { SortingState, PaginationState } from "@tanstack/react-table";
import Samples from "@components/Samples/Samples.tsx";
import SampleDetails from "@components/Samples/SampleDetails.tsx";
import { useSamples } from "@hooks/samples/useGetSamples.ts";
import { useSampleDetails } from "@hooks/samples/useGetSampleDetails.ts";
import { useDeleteSample } from "@hooks/samples/useDeleteSample.ts";
import {toastPromise} from "utils/toast.utils";
import TableLayout from "./layouts/TableLayout";
import Loader from "@components/Shared/Loader";
import ComponentOrLoader from "@components/Shared/ComponentOrLoader";

const SamplesPage = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const dataQuerySamples = useSamples({
    pageNumber: pagination.pageIndex,
    pageSize: pagination.pageSize,
    orderBy: sorting[0]?.id ?? "",
    desc: sorting[0]?.desc ?? true,
  });

  const deleteMutation = useDeleteSample({
    pageNumber: pagination.pageIndex,
    pageSize: pagination.pageSize,
    orderBy: sorting[0]?.id ?? "",
    desc: sorting[0]?.desc ?? true,
  });

  const [sampleDetailsId, setSampleDetailsId] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const dataQuerySampleDetails = useSampleDetails(sampleDetailsId);

  const changeSampleDetails = (id: string) => {
    setDetailsOpen(true);
    setSampleDetailsId(id);
  };

  const handleDelete = async (id: string | null) => {
    if (!id) return;
    await toastPromise(
        deleteMutation.mutateAsync(id),
        {
          loading: 'Deleting sample...',
          success: 'Sample deleted successfully',
          error: 'Failed to delete sample'
        }
    );
  };

  return (
    <TableLayout>
      <ComponentOrLoader
        isLoading={dataQuerySamples.isLoading}
        loader={<Loader />}
      >
        <Samples
          samples={dataQuerySamples.data}
          sorting={sorting}
          pagination={pagination}
          setSorting={setSorting}
          setPagination={setPagination}
          onDelete={handleDelete}
          onEdit={changeSampleDetails}
        />
      </ComponentOrLoader>
      <ComponentOrLoader
        isLoading={dataQuerySampleDetails.isLoading}
        loader={<Loader />}
      >
        <SampleDetails
          sample={dataQuerySampleDetails.data}
          open={detailsOpen}
          openChange={setDetailsOpen}
        />
      </ComponentOrLoader>
    </TableLayout>
  );
};

export default SamplesPage;
