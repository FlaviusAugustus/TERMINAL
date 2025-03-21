import { Navigation } from "./Navbar.tsx";
import { Link } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

/**
 * Props interface for MobileDropdownButton component
 */
interface MobileDropdownButtonProps {
  navigationItems: Navigation[];
}

/**
 * MobileDropdownButton Component
 *
 * A component that renders a mobile dropdown button.
 *
 * @component
 * @param {MobileDropdownButtonProps} props - The props for the MobileDropdownButton component
 * @returns {JSX.Element} - The rendered MobileDropdownButton component.
 */
const NavMobileDropdown = (props: MobileDropdownButtonProps) => {
  return (
    <Menu as="div" className="dropdown">
      <MenuButton className="btn btn-ghost md:hidden">
        <Bars3Icon className="h-5 w-5" />
      </MenuButton>
      <MenuItems
        as="ul"
        transition
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
      >
        {props.navigationItems.map((item, index) => (
          <MenuItem key={index} as="li">
            <Link
              to={{
                pathname: `${item.href}`,
              }}
            >
              {item.name}
            </Link>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};

export default NavMobileDropdown;
