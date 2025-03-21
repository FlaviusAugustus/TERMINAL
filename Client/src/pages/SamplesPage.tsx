import {useState} from "react";
import { SortingState, PaginationState } from "@tanstack/react-table";
import {useSampleDetails, useSamples} from "@hooks/useSampleQuery.ts";
import Samples from "@components/Samples/Samples.tsx";
import SampleDetails from "@components/Samples/SampleDetails.tsx";

const SamplesPage = () => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const dataQuerySamples= useSamples({
        pageNumber: pagination.pageIndex,
        pageSize: pagination.pageSize,
        orderBy: sorting[0]?.id ?? "",
        desc: sorting[0]?.desc ?? true
    });

    const [sampleDetailsId, setSampleDetailsId] = useState<string>("e60274d9-1e14-42c0-853a-cc0dfd599d2c");

    const dataQuerySampleDetails = useSampleDetails(sampleDetailsId);

    const changeSampleDetails = (id: string) => {
        setSampleDetailsId(id);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex justify-center p-5 flex-wrap">
                <div className="flex-1 bg-white p-3 rounded-md m-1">
                    <Samples
                        dataQuery={dataQuerySamples}
                        sorting={sorting}
                        pagination={pagination}
                        setSorting={setSorting}
                        setPagination={setPagination}
                        onChangeSampleDetails={changeSampleDetails}
                    />
                </div>
                <div className="flex-1 bg-white p-3 rounded-md m-1 self-start">
                    <SampleDetails dataQuery={dataQuerySampleDetails}/>
                </div>
            </div>
        </div>
    );
};

export default SamplesPage;
