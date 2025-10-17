import useUserData from "../useUserData.ts";

/**
 * useIsInRole Hook
 *
 * Custom hook to check if the current user has a specific role.
 *
 * @hook
 */
export function useIsInRole(role: string): boolean {
  const { data } = useUserData();

  return role === data?.role;
}
