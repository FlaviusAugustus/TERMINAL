import {useState} from "react";
import {SortingState, PaginationState} from "@tanstack/react-table";
import Samples from "@components/Samples/Samples.tsx";
import SampleDetails from "@components/Samples/SampleDetails.tsx";
import {useSamples} from "@hooks/samples/useGetSamples.ts";
import {useSampleDetails} from "@hooks/samples/useGetSampleDetails.ts";
import {useDeleteSample} from "@hooks/samples/useDeleteSample.ts";


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

    const mutation = useDeleteSample(
        {
            pageNumber: pagination.pageIndex,
            pageSize: pagination.pageSize,
            orderBy: sorting[0]?.id ?? "",
            desc: sorting[0]?.desc ?? true
        }
    );

    const [sampleDetailsId, setSampleDetailsId] = useState<string | null>(null);

    const dataQuerySampleDetails = useSampleDetails(sampleDetailsId);

    const changeSampleDetails = (id: string) => {
        setSampleDetailsId(id);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex flex-wrap sm:flex-nowrap justify-center p-1 gap-1">
                <div className="basis-3/5 rounded-lg bg-white">
                    {dataQuerySamples.isLoading ? (
                        <div className="flex justify-center">
                            <span className="loading loading-spinner loading-md"></span>
                        </div>
                    ) : (
                        <Samples
                            dataQuery={dataQuerySamples.data}
                            sorting={sorting}
                            pagination={pagination}
                            setSorting={setSorting}
                            setPagination={setPagination}
                            onChangeSampleDetails={changeSampleDetails}
                        />
                    )}
                </div>
                <div className="basis-2/5 rounded-md self-start">
                    {dataQuerySampleDetails.isLoading ? (
                        <div className="flex justify-center">
                            <span className="loading loading-spinner loading-md"></span>
                        </div>
                    ) : sampleDetailsId ? (
                        <SampleDetails dataQuery={dataQuerySampleDetails.data}
                                       mutateAsync={mutation.mutateAsync}
                                       isPending={mutation.isPending}
                        />
                    ) : (
                        <div className="bg-white text-center text-gray-500 p-3 rounded">Select a sample to view details</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SamplesPage;