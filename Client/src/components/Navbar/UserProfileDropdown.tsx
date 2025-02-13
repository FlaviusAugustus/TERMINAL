import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {UserCircleIcon} from "@heroicons/react/24/outline";

/**
 * UserProfileDropdown Component
 *
 * The UserProfileDropdown component displays the user profile dropdown in the Navbar.
 *
 * @example
 * ```tsx
 * <UserProfileDropdown />
 * ```
 *
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
                    <a
                        href="#"
                    >
                        Your Profile
                    </a>
                </MenuItem>
                <MenuItem as="li">
                    <a
                        href="#"
                    >
                        Sign out
                    </a>
                </MenuItem>
            </MenuItems>
        </Menu>
    );
};

export default UserProfileDropdown;