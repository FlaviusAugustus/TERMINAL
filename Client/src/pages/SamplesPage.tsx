import { useState } from "react";
import { PaginationState, SortingState } from "@tanstack/react-table";
import Samples from "@components/samples/Samples.tsx";
import SampleDetails from "@components/samples/SampleDetails.tsx";
import { useSamples } from "@hooks/samples/useGetSamples.ts";
import { useSampleDetails } from "@hooks/samples/useGetSampleDetails.ts";
import { useDeleteSample } from "@hooks/samples/useDeleteSample.ts";
import { useSearchSamples } from "@hooks/samples/useSearchSamples.ts";
import TableLayout from "./layouts/TableLayout";
import Loader from "@components/shared/loader/Loader.tsx";
import ComponentOrLoader from "@components/shared/loader/ComponentOrLoader.tsx";
import EditSample from "@components/samples/EditSample";
import DialogLoader from "@components/shared/dialog/DialogLoader.tsx";

const SamplesPage = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [searchPhrase, setSearchPhrase] = useState("");

  const samplesQuery = useSamples({
    pageNumber: pagination.pageIndex,
    pageSize: pagination.pageSize,
    orderBy: sorting[0]?.id ?? "",
    desc: sorting[0]?.desc ?? true,
  });

  const searchSamplesQuery = useSearchSamples({
    searchPhrase,
    pageNumber: pagination.pageIndex,
    pageSize: pagination.pageSize,
  });

  const dataQuerySamples = searchPhrase ? searchSamplesQuery : samplesQuery;

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

  const changeSampleDetails = (id: string) => {
    setSampleDetailsId(id);
    setDetailsOpen(true);
  };

  const editSampleDetails = (id: string) => {
    setSampleDetailsId(id);
    setEditOpen(true);
  };

  const handleDelete = async (id: string | null) => {
    if (!id) return;
    await deleteMutation.mutateAsync(id);
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
      </ComponentOrLoader>
    </TableLayout>
  );
};

export default SamplesPage;
