import { User } from "./Users.tsx";
import { Button } from "@headlessui/react";

interface UserProps {
  user: User;
}

/**
 * UserComp Component
 *
 * A component that displays user information including email and role.
 * It also provides a button to reset the user's password.
 *
 * @component
 */
const UserComp = (props: UserProps) => {
  return (
    <div className="card w-full my-4 items-center">
      <div className="card-body w-96">
        <h2 className="card-title">USER</h2>
        <div className="divider"></div>
        <div> Email: {props.user.email}</div>
        <div> Role: {props.user.role}</div>

        <div className="card-actions justify-end">
          <Button
            className="btn btn-sm "
            onClick={() => console.log("Change password")}
          >
            Reset Password
          </Button>
        </div>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default UserComp;
