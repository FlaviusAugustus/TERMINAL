import { useIsAuthenticated } from "@hooks/users/auth/useIsAuthenticated.ts";
import NotFoundPage from "./NotFoundPage";
import { Navigate } from "react-router-dom";

const LoginOrNotFound = () => {
  const isAuthenticated = useIsAuthenticated();

  return isAuthenticated ? <NotFoundPage /> : <Navigate to="/login" />;
};

export default LoginOrNotFound;
