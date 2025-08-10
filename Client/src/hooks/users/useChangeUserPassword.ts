import { useMutation } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";

interface ChangeUserPasswordDto {
  id: string;
  newPassword: string;
}

async function changeUserPassword({ id, newPassword }: ChangeUserPasswordDto) {
  return await apiClient.patch(`users/${id}/password`, { newPassword });
}

/**
 * useChangeUserPassword Hook
 *
 * A custom hook that provides a mutation function to change a user's password.
 *
 * @hook
 */
export function useChangeUserPassword() {
  return useMutation({
    mutationFn: (data: ChangeUserPasswordDto) => changeUserPassword(data),
  });
}
