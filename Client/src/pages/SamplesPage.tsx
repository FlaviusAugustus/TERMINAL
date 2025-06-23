import { useState } from "react";
import { SortingState, PaginationState } from "@tanstack/react-table";
import Samples from "@components/Samples/Samples.tsx";
import SampleDetails from "@components/Samples/SampleDetails.tsx";
import { useSamples } from "@hooks/samples/useGetSamples.ts";
import { useSampleDetails } from "@hooks/samples/useGetSampleDetails.ts";
import { useDeleteSample } from "@hooks/samples/useDeleteSample.ts";
import TableLayout from "./layouts/TableLayout";
import Loader from "@components/Shared/Loader";
import ComponentOrLoader from "@components/Shared/ComponentOrLoader";
import EditSample from "@components/Samples/EditSample";
import DialogLoader from "@components/Shared/DialogLoader";
import {useSearchSamples} from "@hooks/samples/useSearchSamples.ts";

const SamplesPage = () => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const [searchPhrase, setSearchPhrase] = useState<string>("");

    const dataQuerySamples = useSamples({
        pageNumber: pagination.pageIndex,
        pageSize: pagination.pageSize,
        orderBy: sorting[0]?.id ?? "",
        desc: sorting[0]?.desc ?? true,
    });

    const dataQuerySearchSamples = useSearchSamples({
        searchPhrase,
        pageNumber: pagination.pageIndex,
        pageSize: pagination.pageSize,
    });

    const isSearching = !!searchPhrase;
    const samplesData = isSearching ? dataQuerySearchSamples.data : dataQuerySamples.data;

    const handleSearch = (query: string) => {
        setSearchPhrase(query);
        setPagination((prev) => ({...prev, pageIndex: 0}));
    };

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
            <ComponentOrLoader
                isLoading={isSearching ? dataQuerySearchSamples.isLoading : dataQuerySamples.isLoading}
                loader={<Loader/>}
            >
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