import React, { useState, useCallback } from "react";
import TerminalBanner from "../Shared/Forms/TerminalBanner.tsx";
import InputField from "../Shared/Forms/InputField.tsx";
import SubmitButton from "../Shared/Forms/SubmitButton.tsx";
import RememberMeButton from "./RememberMeButton";

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
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <TerminalBanner />
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
                <InputField
                    name="email"
                    type="text"
                    label="Email"
                    value={userData.email}
                    onChange={handleChange}
                    isValid={isEmailValid}
                />
                <InputField
                    name="password"
                    type="password"
                    label="Password"
                    value={userData.password}
                    onChange={handleChange}
                />
                <RememberMeButton />
                <SubmitButton label="Sign in" isLoading={isLoading} />
            </form>
        </div>
    );
};

export default LoginForm;