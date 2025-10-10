import { useMutation } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";

async function refreshToken() {
  return await apiClient.post(`/users/refresh`);
}

/**
 * useLoginMutation Hook
 *
 * A custom hook that provides functionality to log in a user.
 *
 * @hook
 */
export function useLogoutMutation() {
  const result = useMutation({
    mutationFn: () => refreshToken(),
    onSuccess: (data) => {
      sessionStorage.setItem("token", data.data.token);
      localStorage.setItem("refresh-token", data.data.refreshToken);
    },
  });

  return result;
}
