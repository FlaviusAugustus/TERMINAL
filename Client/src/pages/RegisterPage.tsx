import { Suspense } from "react";
import RegisterForm from "@components/register/RegisterForm.tsx";

const RegisterPage = () => {
  return (
    <div className="flex flex-wrap sm:flex-nowrap  min-h-screen items-center justify-center bg-gray-100">
      <Suspense fallback={<div>Loading...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
};

export default RegisterPage;
