import UserComp from "./UserComp.tsx";
import { Button } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { DialogComp } from "@components/shared/DialogComp.tsx";
import InvitationForm from "./InvitationForm.tsx";

export interface User {
  email: string;
  role: string;
}

/**
 * users Component
 *
 * A component that displays user information and allows inviting new users.
 * It includes a button to open a dialog for inviting new users and displays the current user information.
 *
 * @component
 */
const Users = () => {
  const user: User = {
    email: "Test",
    role: "Test",
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-full flex-wrap justify-center bg-white p-3 rounded-md">
      <UserComp user={user} />

      <div className="w-full flex justify-end">
        <Button className="btn" onClick={() => setIsOpen(true)}>
          <PlusCircleIcon className="h-6 w-6 mt-0.5" />
          Invite User
        </Button>
      </div>

      <DialogComp isOpen={isOpen} setIsOpen={setIsOpen} title="Invite new user">
        <InvitationForm />
      </DialogComp>
    </div>
  );
};

export default Users;
