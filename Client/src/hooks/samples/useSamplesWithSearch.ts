import { useSamples, SamplesParams } from "./useGetSamples";
import { useSearchSamples, SamplesSearchParams } from "./useSearchSamples";
import { useSearchableTable } from "../useSearchableTable";
import { Sample } from "@api/models/Sample";
import {PaginationState, SortingState} from "@tanstack/react-table";

export function useSamplesWithSearch() {
    return useSearchableTable<Sample, SamplesParams, SamplesSearchParams>(
        {
            useRegularQuery: useSamples,
            useSearchQuery: useSearchSamples,
        },
        (pagination: PaginationState, sorting: SortingState): SamplesParams => ({
            pageNumber: pagination.pageIndex,
            pageSize: pagination.pageSize,
            orderBy: sorting[0]?.id ?? "",
            desc: sorting[0]?.desc ?? true,
        }),
        (searchPhrase: string, pagination: PaginationState): SamplesSearchParams => ({
            searchPhrase,
            pageNumber: pagination.pageIndex,
            pageSize: pagination.pageSize,
        })
    );
}