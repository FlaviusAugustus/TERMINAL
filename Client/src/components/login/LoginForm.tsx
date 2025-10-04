import { useState, useCallback } from "react";
import TerminalBanner from "@components/shared/common/TerminalBanner.tsx";
import FormInput from "@components/shared/form/FormInput.tsx";
import SubmitButton from "@components/shared/form/SubmitButton.tsx";
import {
  LoginRequest,
  useLoginMutation,
} from "@hooks/users/auth/useLoginMutation.ts";
import { useNavigate } from "react-router-dom";
import { toastPromise } from "@utils/toast.utils.tsx";
import Form from "@components/shared/form/Form.tsx";

/**
 * LoginForm Component
 *
 * A form component for user login supporting email validation.
 *
 * @component
 */
const LoginForm = () => {
  const mutation = useLoginMutation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback(async () => {
    const loginRequest: LoginRequest = {
      email: email,
      password: password,
    };

    await toastPromise(mutation.mutateAsync(loginRequest), {
      loading: "Logging in...",
      success: "login successful",
      error: "login failed",
    });
    navigate("/");
  }, [mutation, email, password]);

  return (
    <div className="bg-white px-4 py-5 rounded-lg border-[1px] border-black/15 max-w-3xl w-full">
      <div className="flex gap-5 h-full">
        <div className="w-full flex-col gap-3 hidden sm:flex">
          <div className="border-[1px] [background-size:16px_16px] h-full flex justify-center items-center border-black/15 rounded-md bg-[radial-gradient(#e5e7eb_1px,transparent_1px)]">
            <TerminalBanner />
          </div>
        </div>
        <div className="w-full h-full">
          <div className="py-8 w-full">
            <p className="text-2xl font-normal text-center">Welcome back</p>
            <p className="text-sm font-normal text-center text-gray-600">
              Sign in to your account
            </p>
          </div>
          <Form
            handleSubmit={handleSubmit}
            className="w-full h-full flex flex-col gap-3"
          >
            <div className="flex flex-col">
              <FormInput
                name="email"
                type="email"
                label="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormInput
                name="password"
                type="password"
                label="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <SubmitButton label="Sign in" isLoading={mutation.isPending} />
              <p className="text-xs p-0 font-normal text-center text-gray-600">
                Don&apos;t have an account? Ask for an invitation
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
