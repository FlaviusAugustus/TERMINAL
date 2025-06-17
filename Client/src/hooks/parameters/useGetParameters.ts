import {keepPreviousData, useQuery} from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";

const fetchParameters = async () => {
    const parameters = await apiClient.get("/parameters");
    return {
        rows: parameters.data.parameters,
        pageAmount: 99,
        rowsAmount: 99
    }

}

const useGetParameters = () => {
    return useQuery({
        queryKey: ['parameter'],
        queryFn: () => fetchParameters(),
        placeholderData: keepPreviousData
    })
}