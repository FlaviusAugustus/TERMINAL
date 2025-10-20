import { useEffect, useState } from "react";
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
import { DialogSubmitButton } from "@components/shared/dialog/DialogSubmitButton.tsx";

export interface UserDetailsProps {
  dataQuery: UserDetailsDto;
  onSubmit: (id: string, email: string, role: string) => void;
  open: boolean;
  setOpen: (arg0: boolean) => void;
  isSubmitting: boolean;
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
      <FormInput
        label="Email"
        id="email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setIsChanged(true);
        }}
      />
      <LabeledSelect
        label="Role"
        value={role}
        onChange={(value: string) => {
          if (!value) return;
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
          <DialogSubmitButton
            disabled={!isChanged}
            className="hover:border-blue-400 "
            onClick={() => props.onSubmit(props.dataQuery.id, email, role)}
            isSubmitting={props.isSubmitting}
          >
            Submit changes
          </DialogSubmitButton>
          <DialogButton
            disabled={!isChanged}
            className="!w-fit hover:border-blue-400"
            onClick={handleReset}
          >
            <ArrowPathIcon className="h-4 w-4" />
          </DialogButton>
        </div>
      </div>
    </DialogComp>
  );
};

export default UserDetails;
