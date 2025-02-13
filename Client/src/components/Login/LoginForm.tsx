import React, { useState, useCallback } from "react";
import TerminalBanner from "./TerminalBanner";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import RememberMeButton from "./RememberMeButton";


/**
 * LoginForm Component
 *
 * A form component for user login. It includes fields for email and password,
 * a "Remember Me" checkbox, and a submit button. The form validates the email
 * format and displays a loading indicator while the form is being submitted.
 *
 * @example
 * ```tsx
 * <LoginForm />
 * ```
 *
 * @returns {JSX.Element} - The rendered LoginForm component.
 */
const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });
    const [isEmailValid, setIsEmailValid] = useState(true);

    const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("form submitted");
        const emailValid = validateEmail(userData.email);

        setIsEmailValid(emailValid);

        if (!emailValid) {
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            console.log(userData);
        }, 2000);
    }, [userData]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <TerminalBanner />
                <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
                    <InputField
                        name="email"
                        type="text"
                        label="Email"
                        value={userData.email}
                        description="email address"
                        onChange={handleChange}
                        isValid={isEmailValid}
                    />
                    <InputField
                        name="password"
                        type="password"
                        label="Password"
                        value={userData.password}
                        description="password"
                        onChange={handleChange}
                    />
                    <RememberMeButton />
                    <SubmitButton label="Sign in" isLoading={isLoading} />
                </form>
            </div>
        </div>
    );
};

export default LoginForm;