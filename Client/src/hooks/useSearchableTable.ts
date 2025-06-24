import { useState, useEffect } from "react";
import { SortingState, PaginationState } from "@tanstack/react-table";
import { UseQueryResult} from "@tanstack/react-query";

export interface SearchableTableParams {
    pageNumber: number;
    pageSize: number;
    orderBy?: string;
    desc?: boolean;
}

export interface SearchParams {
    searchPhrase: string;
    pageNumber: number;
    pageSize: number;
}

export interface SearchableTableResponse<T> {
    rows: T[];
    pageAmount: number;
    rowsAmount: number;
}

export interface SearchableTableHooks<T, TParams extends SearchableTableParams, TSearchParams extends SearchParams> {
    useRegularQuery: (params: TParams) => UseQueryResult<SearchableTableResponse<T>>;
    useSearchQuery: (params: TSearchParams) => UseQueryResult<SearchableTableResponse<T>>;
}

export function useSearchableTable<T, TParams extends SearchableTableParams, TSearchParams extends SearchParams>(
    hooks: SearchableTableHooks<T, TParams, TSearchParams>,
    createParams: (pagination: PaginationState, sorting: SortingState) => TParams,
    createSearchParams: (searchPhrase: string, pagination: PaginationState) => TSearchParams
){

    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [searchPhrase, setSearchPhrase] = useState<string>("");
    const [isSearching, setIsSearching] = useState<boolean>(false);

    const regularParams = createParams(pagination, sorting);
    const searchParams = createSearchParams(searchPhrase, pagination);

    const regularQuery = hooks.useRegularQuery(regularParams);
    const searchQuery = hooks.useSearchQuery(searchParams);

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

    const activeQuery = isSearching ? searchQuery : regularQuery;
    const data = activeQuery.data;
    const isLoading = activeQuery.isLoading;

    return {
        data,
        isLoading,
        searchPhrase,
        isSearching,
        sorting,
        setSorting,
        pagination,
        setPagination,
        handleSearch,
        clearSearch,
        deleteMutationParams: regularParams,
    };
}