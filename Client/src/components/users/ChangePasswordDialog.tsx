import { useState } from "react";
import { useChangeUserPassword } from "@hooks/users/useChangeUserPassword.ts";
import { toastPromise } from "@utils/toast.utils.tsx";
import {
  DialogButton,
  DialogComp,
} from "@components/shared/dialog/DialogComp.tsx";

import FormInput from "@components/shared/form/FormInput.tsx";
import { DialogSubmitButton } from "@components/shared/dialog/DialogSubmitButton.tsx";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export interface ChangePasswordDialogProps {
  open: boolean;
  setOpen: (arg0: boolean) => void;
  onClose: () => void;
  userId: string;
}

/**
 * ChangePasswordDialog Component
 *
 * A dialog component for changing user password.
 *
 * @component
 */
const ChangePasswordDialog = ({
  open,
  setOpen,
  onClose,
  userId,
}: ChangePasswordDialogProps) => {
  const [isChanged, setIsChanged] = useState(true);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changePasswordMutation = useChangeUserPassword();

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      toastPromise(Promise.reject(), {
        error: "Passwords do not match!",
        success: "",
        loading: "",
      });
      return;
    }
    await toastPromise(
      changePasswordMutation.mutateAsync({
        id: userId,
        newPassword: newPassword,
      }),
      {
        success: "Password changed successfully",
        error: "Failed to change password",
        loading: "Changing password...",
      }
    );
    onClose();
  };

  const handleReset = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsChanged(false);
  };

  return (
    <DialogComp isOpen={open} setIsOpen={setOpen} title={"Change Password"}>
      <FormInput
        label="Old password"
        id="oldPassword"
        type="password"
        value={oldPassword}
        onChange={(e) => {
          setOldPassword(e.target.value);
          setIsChanged(true);
        }}
      />
      <FormInput
        label="New password"
        id="newpassword"
        type="password"
        value={newPassword}
        onChange={(e) => {
          setNewPassword(e.target.value);
          setIsChanged(true);
        }}
      />
      <FormInput
        label="Confirm new password"
        id="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          setIsChanged(true);
        }}
      />
      <div className="flex gap-1 mt-4">
        <DialogSubmitButton
          disabled={!isChanged}
          className="hover:border-blue-400 "
          onClick={handleSubmit}
          isSubmitting={changePasswordMutation.isPending}
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
    </DialogComp>
  );
};

export default ChangePasswordDialog;
