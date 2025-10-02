import React, { useCallback, useState } from "react";
import TerminalBanner from "@components/shared/TerminalBanner.tsx";
import InputField from "@components/shared/InputField.tsx";
import SubmitButton from "@components/shared/SubmitButton.tsx";
import SelectField from "./SelectField.tsx";
import InvitationLink from "./InvitationLink.tsx";

const roles: string[] = ["ADMINISTRATOR", "MODERATOR", "USER"];

/**
 * InvitationForm Component
 *
 * A form component for inviting users with email validation and role selection.
 *
 * @component
 */
const InvitationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    role: "",
  });

  const [isEmailValid, setIsEmailValid] = useState(true);
  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const [invitationLink, setInvitationLink] = useState({
    isValid: false,
    link: "",
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const emailValid = validateEmail(userData.email);
      setIsEmailValid(emailValid);

      if (!emailValid) {
        console.log("invalid email");
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        console.log(userData);
        setInvitationLink({
          isValid: true,
          link: "http://localhost:5173/register",
        });
      }, 2000);
    },
    [userData]
  );

  return (
    <div>
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
        <SelectField
          label="Role"
          name="role"
          values={roles}
          onChange={handleChange}
        />
        <SubmitButton label="Invite" isLoading={isLoading} />
      </form>
      {invitationLink.isValid && (
        <div>
          <InvitationLink link={invitationLink.link} />
        </div>
      )}
    </div>
  );
};

export default InvitationForm;
