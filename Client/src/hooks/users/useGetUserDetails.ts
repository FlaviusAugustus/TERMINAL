import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {UserDetailsDto} from "@api/terminalSchemas.ts";
import apiClient from "@api/apiClient.ts";


async function fetchUserDetails(id: string|null):Promise<UserDetailsDto>{
    return (await apiClient.get(`/users/${id}`)).data;
}


export function useUserDetails(id: string|null ){
    return useQuery({
        queryKey:['userDetails', id],
        queryFn: () => fetchUserDetails(id),
        placeholderData: keepPreviousData,
        enabled: (id !== null)
    })
}