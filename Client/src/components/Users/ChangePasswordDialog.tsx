import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Input, Button } from "@headlessui/react";
import { useChangeUserPassword } from "@hooks/users/useChangeUserPassword.ts";
import { toastPromise } from "../../utils/toast.utils.tsx";

export interface ChangePasswordDialogProps {
    isOpen: boolean;
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
const ChangePasswordDialog = ({isOpen, onClose, userId}: ChangePasswordDialogProps) => {
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
            changePasswordMutation.mutateAsync({id: userId, newPassword: newPassword}),
            {
                success: "Password changed successfully",
                error: "Failed to change password",
                loading: "Changing password...",
            });
        onClose();
    }
    
    return (
        <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-10 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 shadow-lg w-96">
                <Dialog.Title className="text-lg font-bold">Change Password</Dialog.Title>
                <div className="mt-4">
                    <Input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="input input-bordered w-full mb-4"
                    />
                    <Input
                        type="password"
                        placeholder="Repeat Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="mt-6 flex justify-end gap-2">
                    <Button className="btn btn-sm btn-error text-white rounded" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button className="btn btn-sm btn-primary text-white rounded" onClick={handleSubmit} disabled={changePasswordMutation.isPending}>
                        Submit
                    </Button>
                </div>
            </div>
        </Dialog>

    )
}

export default ChangePasswordDialog;