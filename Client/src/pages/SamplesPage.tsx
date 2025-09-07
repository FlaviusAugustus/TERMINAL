import { useState } from "react";
import Samples from "@components/Samples/Samples.tsx";
import SampleDetails from "@components/Samples/SampleDetails.tsx";
import { useSampleDetails } from "@hooks/samples/useGetSampleDetails.ts";
import { useDeleteSample } from "@hooks/samples/useDeleteSample.ts";
import TableLayout from "./layouts/TableLayout";
import Loader from "@components/Shared/Loader";
import ComponentOrLoader from "@components/Shared/ComponentOrLoader";
import EditSample from "@components/Samples/EditSample";
import DialogLoader from "@components/Shared/DialogLoader";
import { useSamplesWithSearch } from "@hooks/samples/useSamplesWithSearch.ts";

const SamplesPage = () => {
    const {
        data: samplesData,
        isLoading,
        searchPhrase,
        isSearching,
        sorting,
        setSorting,
        pagination,
        setPagination,
        handleSearch,
        clearSearch,
        deleteMutationParams,
    } = useSamplesWithSearch();

    const deleteMutation = useDeleteSample(deleteMutationParams);

    const [sampleDetailsId, setSampleDetailsId] = useState<string | null>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const dataQuerySampleDetails = useSampleDetails(sampleDetailsId);

    const changeSampleDetails = (id: string) => {
        setDetailsOpen(true);
        setSampleDetailsId(id);
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
            <ComponentOrLoader isLoading={isLoading} loader={<Loader />}>
                <Samples
                    samples={samplesData}
                    sorting={sorting}
                    pagination={pagination}
                    setSorting={setSorting}
                    setPagination={setPagination}
                    onDelete={handleDelete}
                    onDetails={changeSampleDetails}
                    onEdit={editSampleDetails}
                    onSearch={handleSearch}
                    onClearSearch={clearSearch}
                    isSearching={isSearching}
                    searchValue={searchPhrase}
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