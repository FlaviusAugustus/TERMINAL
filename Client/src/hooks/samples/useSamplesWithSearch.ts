import { useState, useEffect } from "react";
import { SortingState, PaginationState } from "@tanstack/react-table";
import { useSamples } from "./useGetSamples";
import { useSearchSamples } from "./useSearchSamples";

export function useSamplesWithSearch() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [searchPhrase, setSearchPhrase] = useState<string>("");
    const [isSearching, setIsSearching] = useState<boolean>(false);

    const samplesQuery = useSamples({
        pageNumber: pagination.pageIndex,
        pageSize: pagination.pageSize,
        orderBy: sorting[0]?.id ?? "",
        desc: sorting[0]?.desc ?? true,
    });

    const searchQuery = useSearchSamples({
        searchPhrase,
        pageNumber: pagination.pageIndex,
        pageSize: pagination.pageSize,
    });

    useEffect(() => {
        if (searchPhrase.trim() !== "") {
            setPagination(prev => ({ ...prev, pageIndex: 0 }));
        }
    }, [searchPhrase]);

    const handleSearch = (query: string) => {
        const trimmedQuery = query.trim();
        setSearchPhrase(trimmedQuery);

        if (trimmedQuery === "") {
            setIsSearching(false);
        } else {
            setIsSearching(true);
            setPagination(prev => ({ ...prev, pageIndex: 0 }));
        }
    };

    const clearSearch = () => {
        setSearchPhrase("");
        setIsSearching(false);
        setPagination(prev => ({ ...prev, pageIndex: 0 }));
    };

    const activeQuery = isSearching ? searchQuery : samplesQuery;
    const samplesData = activeQuery.data;
    const isLoading = activeQuery.isLoading;

    return {
        samplesData,
        isLoading,
        searchPhrase,
        isSearching,
        sorting,
        setSorting,
        pagination,
        setPagination,
        handleSearch,
        clearSearch,
        deleteMutationParams: {
            pageNumber: pagination.pageIndex,
            pageSize: pagination.pageSize,
            orderBy: sorting[0]?.id ?? "",
            desc: sorting[0]?.desc ?? true,
        }
    };
}