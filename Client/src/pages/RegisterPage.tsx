import { Suspense } from "react";
import RegisterForm from "../components/Register/RegisterForm.tsx";

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Suspense fallback={<div>Loading...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
};

export default RegisterPage;
