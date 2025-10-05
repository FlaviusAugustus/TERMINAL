import TerminalBanner from "@components/shared/common/TerminalBanner.tsx";
import FormInput from "@components/shared/form/FormInput.tsx";
import React, { useCallback, useState } from "react";
import SubmitButton from "@components/shared/form/SubmitButton.tsx";

/**
 * RegisterForm Component
 *
 * A form component for user registration with password validation.
 *
 * @component
 */
const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [firstPassword, setFirstPassword] = useState({
    value: "",
    isValid: true,
  });
  const [secondPassword, setSecondPassword] = useState({
    value: "",
    isValid: true,
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "firstPassword")
      setFirstPassword((prev) => ({
        ...prev,
        value: value,
      }));
    else
      setSecondPassword((prev) => ({
        ...prev,
        value: value,
      }));
  }, []);

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*_+-]{6,32}$/;
    return regex.test(password);
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("form submitted");

      const validFirstPass = validatePassword(firstPassword.value);
      setFirstPassword({
        ...firstPassword,
        isValid: validFirstPass,
      });

      const validSecondPass = firstPassword.value === secondPassword.value;
      setSecondPassword({
        ...secondPassword,
        isValid: validSecondPass,
      });

      if (!(validFirstPass || validSecondPass)) {
        console.log("Incorrect");
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        console.log(firstPassword);
        console.log(secondPassword);
      }, 2000);
    },
    [firstPassword, secondPassword]
  );

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <TerminalBanner />
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
        <FormInput
          name="firstPassword"
          type="password"
          label="Password"
          value={firstPassword.value}
          onChange={handleChange}
        />
        <FormInput
          name="secondPassword"
          type="password"
          label="Reapet Password"
          value={secondPassword.value}
          onChange={handleChange}
        />
        <SubmitButton label="Set Password" isLoading={isLoading} />
      </form>
    </div>
  );
};

export default RegisterForm;
