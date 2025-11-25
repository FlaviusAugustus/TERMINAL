import FormInput from "@components/shared/form/FormInput.tsx";
import { useState } from "react";
import { toastPromise } from "@utils/toast.utils.tsx";
import Form from "@components/shared/form/Form.tsx";
import SubmitButton from "@components/shared/form/SubmitButton.tsx";
import { useAddUser } from "@hooks/users/useAddUser.ts";
import roles, { Role } from "@api/models/Role.ts";
import {
  LabeledSelect,
  SelectItem,
} from "@components/shared/form/LabeledSelect.tsx";

const AddUser = () => {
  const { mutateAsync, isPending } = useAddUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("Registered");

  const handleSubmit = async () => {
    await toastPromise(
      mutateAsync({ email: email, password: password, role: role }),
      {
        success: "User added succesfully",
        loading: "Adding user...",
        error: "Failed adding user",
      }
    );
  };

  return (
    <div className="w-full h-full flex items-start justify-center pt-[15vh]">
      <div className="rounded-md bg-white p-4 w-[25rem] border shadow-sm">
        <div className="flex justify-between items-center w-full pb-5">
          <p className="font-medium text-lg">Add new user</p>
        </div>
        <Form handleSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <FormInput
              label="E-mail"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <FormInput
              label="Password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <LabeledSelect
              label="Role"
              value={role}
              onChange={(value: Role) => {
                if (!value) return;
                setRole(value);
              }}
            >
              {roles.map((role) => (
                <SelectItem value={role} displayValue={role} key={role} />
              ))}
            </LabeledSelect>
            <SubmitButton label="Add user" isLoading={isPending} />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddUser;
