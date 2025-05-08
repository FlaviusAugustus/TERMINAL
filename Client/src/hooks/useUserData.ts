import { useQuery } from "@tanstack/react-query";
import { UserDataResponse } from "../api/terminalSchemas";
import apiClient from "../api/apiClient";

async function getUserData(): Promise<UserDataResponse> {
  const response = await apiClient.get<UserDataResponse>("/users/me");

  return response.data;
}

function useUserData() {
  return useQuery({
    queryKey: ["user"],
    staleTime: Infinity,
    queryFn: getUserData,
  });
}

export default useUserData;
