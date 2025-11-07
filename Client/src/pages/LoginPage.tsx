import LoginForm from "@components/login/LoginForm";
import { useEffect } from "react";
import { useIsAuthenticated } from "@hooks/users/auth/useIsAuthenticated.ts";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex min-h-screen p-4 items-center justify-center bg-gray-100">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
