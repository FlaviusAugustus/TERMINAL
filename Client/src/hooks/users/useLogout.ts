import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  return logout;
}

export default useLogout;
