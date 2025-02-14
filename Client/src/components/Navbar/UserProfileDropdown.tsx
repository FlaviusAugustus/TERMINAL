import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {UserCircleIcon} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";

/**
 * UserProfileDropdown Component
 *
 * A component that renders a user profile dropdown.
 *
 * @component
 * @returns {JSX.Element} - The rendered UserProfileDropdown component.
 */
const UserProfileDropdown = () => {
    {/* Profile dropdown */}
    return   (
        <Menu as="div" className="dropdown dropdown-end">
            <div>
                <MenuButton tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <span className="sr-only">Open user menu</span>
                    <UserCircleIcon className="w-10 rounded-full"/>
                </MenuButton>
            </div>
            <MenuItems
                transition
                as="ul"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >

                <MenuItem as="li">
                    {({ close }) => (
                        <Link
                            to={{
                                pathname: `/settings`
                            }}
                            onClick={close}
                        >
                            Settings
                        </Link>
                    )}
                </MenuItem>

                <MenuItem as="li">
                    <a
                        href="/login"
                    >
                        Sign in
                    </a>
                </MenuItem>
            </MenuItems>
        </Menu>
    );
};

export default UserProfileDropdown;