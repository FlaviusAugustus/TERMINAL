import { useQuery } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";
import { UserDetailsDto } from "@api/models/User.ts";

async function getUserData(): Promise<UserDetailsDto> {
  const response = await apiClient.get<UserDetailsDto>("/users/me");

  return response.data;
}

/**
 * useUserData Hook
 *
 * A custom hook that fetches the user data from the API.
 *
 * @hook
 */
function useUserData() {
  return useQuery({
    queryKey: ["user"],
    staleTime: Infinity,
    queryFn: getUserData,
  });
}

export default useUserData;
