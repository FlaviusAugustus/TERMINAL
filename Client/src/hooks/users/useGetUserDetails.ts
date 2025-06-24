import { keepPreviousData, useQuery } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";
import { UserDetailsDto } from "@api/models/User";

async function fetchUserDetails(id: string | null): Promise<UserDetailsDto> {
  return (await apiClient.get(`/users/${id}`)).data;
}

/**
 * Custom hook to fetch user details by ID.
 *
 * This hook uses React Query to manage the fetching state and caching of user details.
 * It will return the user details for the given ID, or keep previous data while loading new data.
 * It is enabled only when the ID is not null.
 *
 * @hook
 */
export function useUserDetails(id: string | null) {
  return useQuery({
    queryKey: ["userDetails", id],
    queryFn: () => fetchUserDetails(id),
    placeholderData: keepPreviousData,
    enabled: id !== null,
  });
}
