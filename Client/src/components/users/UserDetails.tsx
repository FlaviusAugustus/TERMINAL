import { useState, useEffect } from "react";
import FormInput from "@components/shared/form/FormInput.tsx";
import {
  DialogButton,
  DialogComp,
} from "@components/shared/dialog/DialogComp.tsx";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import {
  LabeledSelect,
  SelectItem,
} from "@components/shared/form/LabeledSelect.tsx";
import roles from "@api/models/Role";
import { UserDetailsDto } from "@api/models/User";
import Form from "@components/shared/form/Form";

export interface UserDetailsProps {
  dataQuery: UserDetailsDto;
  onSubmit: (id: string, email: string, role: string) => Promise<void>;
  open: boolean;
  setOpen: (arg0: boolean) => void;
}

/**
 * UserDetails Component
 *
 * Displays details of a user including email and role.
 * Provides functionality to reset changes, submit changes, change password, and delete the user.
 *
 * @component
 */
const UserDetails = (props: UserDetailsProps) => {
  const [email, setEmail] = useState(props.dataQuery?.email);
  const [role, setRole] = useState(props.dataQuery?.role);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setEmail(props.dataQuery?.email || "");
    setRole(props.dataQuery?.role || "");
    setIsChanged(false);
  }, [props.dataQuery]);

  const handleReset = () => {
    setEmail(props.dataQuery?.email || "");
    setRole(props.dataQuery?.role || "");
    setIsChanged(false);
  };

  return (
    <DialogComp
      isOpen={props.open}
      setIsOpen={props.setOpen}
      title={"Edit user"}
    >
      <Form
        handleSubmit={() => props.onSubmit(props.dataQuery.id, email, role)}
      >
        <FormInput
          name="email"
          label="Email"
          type="email"
          value={email}
          required
          onChange={(e) => {
            setEmail(e.target.value);
            setIsChanged(true);
          }}
        />
        <LabeledSelect
          label="Role"
          value={role}
          onChange={(value: string) => {
            setRole(value);
            setIsChanged(true);
          }}
        >
          {roles.map((role) => (
            <SelectItem value={role} displayValue={role} key={role} />
          ))}
        </LabeledSelect>
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex gap-1">
            <DialogButton
              disabled={!isChanged}
              type="submit"
              className="hover:border-blue-400 "
            >
              Submit changes
            </DialogButton>
            <DialogButton
              disabled={!isChanged}
              className="!w-fit hover:border-blue-400"
              onClick={handleReset}
            >
              <ArrowPathIcon className="h-4 w-4" />
            </DialogButton>
          </div>
        </div>
      </Form>
    </DialogComp>
  );
};

export default UserDetails;
