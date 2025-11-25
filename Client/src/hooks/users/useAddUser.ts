import { useMutation } from "@tanstack/react-query";
import apiClient from "@api/apiClient.ts";
import { Role } from "@api/models/Role.ts";

export type CreateUserRequest = {
  email: string;
  password: string;
  role: Role;
};

async function addUser(params: CreateUserRequest) {
  await apiClient.post("/users", params);
}

/**
 * useUsers Hook
 *
 * Create new user.
 *
 * @hook
 */
export function useAddUser() {
  return useMutation({
    mutationKey: ["addUser"],
    mutationFn: (params: CreateUserRequest) => addUser(params),
  });
}
