import React, { useState, useCallback } from "react";
import TerminalBanner from "@components/Shared/Forms/TerminalBanner.tsx";
import InputField from "@components/Shared/Forms/InputField.tsx";
import SubmitButton from "@components/Shared/Forms/SubmitButton.tsx";
import { useLoginMutation } from "@hooks/useLoginMutation.ts";
import { LoginRequest } from "@api/terminalSchemas";
import { useNavigate } from "react-router-dom";
import {toastNotify, toastPromise} from "../../utils/toast.utils.tsx";
import RememberMeButton from "@components/Login/RememberMeButton.tsx";


/**
 * LoginForm Component
 *
 * A form component for user login supporting email validation.
 *
 * @component
 * @returns {JSX.Element} - The rendered LoginForm component.
 */
const LoginForm = () => {
    const mutation = useLoginMutation();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);

    const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            const emailValid = validateEmail(email);
            setIsEmailValid(emailValid);

            if (!emailValid) {
                toastNotify.error("Please enter a valid email address");
                return;
            }

            const loginRequest: LoginRequest = {
                email: email,
                password: password,
            };

            try {
                await toastPromise(
                    mutation.mutateAsync(loginRequest),
                    {
                        loading: "Logging in...",
                        success: "Login successful",
                        error: "Login failed",
                    }
                );
                navigate("/");
            } catch {
                // Error is handled by toastPromise
            }

        },
        [mutation, email, password],
    );

    return (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <TerminalBanner />
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
                <InputField
                    name="email"
                    type="text"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isValid={isEmailValid}
                />
                <InputField
                    name="password"
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <RememberMeButton />
                <SubmitButton label="Sign in" isLoading={mutation.isPending} />
            </form>
        </div>
    );
};

export default LoginForm;