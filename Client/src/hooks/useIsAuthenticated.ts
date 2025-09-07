/**
 * useIsAuthenticated Hook
 *
 * Hook to check if the user is authenticated.
 *
 * @hook
 */
export function useIsAuthenticated(): boolean | undefined {
  return sessionStorage.getItem("token") !== null;
}
