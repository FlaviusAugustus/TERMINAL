import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

/**
 * useLogout Hook
 *
 * A custom hook that provides a logout function to clear the session and navigate to the login page.
 *
 * @hook
 */
function useLogout() {
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  return logout;
}

export default useLogout;
