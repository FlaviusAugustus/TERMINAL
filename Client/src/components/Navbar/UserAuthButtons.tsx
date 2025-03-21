import { Link } from "react-router-dom";
import { IdentificationIcon, KeyIcon } from "@heroicons/react/24/outline";
import { Button } from "@headlessui/react";

/**
 * UserAuthButtons Component
 *
 * A component that renders authentication buttons.
 *
 * @component
 * @returns {JSX.Element} - The rendered UserAuthButtons component.
 */
const UserAuthButtons = () => {
  return (
    <>
      <Button className="btn">
        <Link
          to={{
            pathname: `/login`,
          }}
        >
          <KeyIcon className="h-5 w-5" />
          Login
        </Link>
      </Button>
      <Button className="btn">
        <Link
          to={{
            pathname: `/register`,
          }}
        >
          <IdentificationIcon className="h-5 w-5" />
          Sign up
        </Link>
      </Button>
    </>
  );
};

export default UserAuthButtons;
