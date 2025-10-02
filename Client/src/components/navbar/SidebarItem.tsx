import { NavLink } from "react-router-dom";

export type NavbarItemProps = {
  icon?: React.ReactNode;
  text: string;
  href: string;
};

/**
 * SidebarItem Component
 *
 * A component that represents an item in the sidebar navigation.
 *
 * @component
 */
const SidebarItem = ({ icon, text, href }: NavbarItemProps) => {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        isActive ? "bg-gray-200/60 rounded-md" : ""
      }
    >
      <div className="flex gap-2 rounded-md p-2 hover:bg-gray-200/60 cursor-pointer">
        {icon}
        <p className="text-sm">{text}</p>
      </div>
    </NavLink>
  );
};

export default SidebarItem;
