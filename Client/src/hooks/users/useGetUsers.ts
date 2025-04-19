import {UserDetailsDto} from "@api/terminalSchemas.ts";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";

export type UsersRequest = {
    pageNumber: number;
    pageSize: number;
    orderBy?: string;
    desc?: boolean;
}

export type UsersResponse = {
    rows: UserDetailsDto[];
    pageAmount: number;
    rowsAmount: number;
}

async function fetchDataUsers(params:UsersRequest): Promise<UsersResponse> {
    const users = await apiClient.get('/users', {params});
    const amountOfUsers = await apiClient.get('/users/amount');
    return{
        rows: users.data.users,
        pageAmount: Math.ceil(amountOfUsers.data / params.pageSize),
        rowsAmount: amountOfUsers.data,
    }
}

export function useUsers(params: UsersRequest) {
    return useQuery(
        {
            queryKey: ['users', params],
            queryFn: () => fetchDataUsers(params),
            placeholderData: keepPreviousData
        }
    )
}

