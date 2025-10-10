import { useMutation } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";

async function loginUser() {
  return await apiClient.post(`/users/logout`);
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
    mutationFn: () => loginUser(),
    onSuccess: () => {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("refresh-token");
    },
  });

  return result;
}
