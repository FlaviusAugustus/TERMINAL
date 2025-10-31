import clsx from "clsx";
import { NavLink } from "react-router-dom";

export type NavbarItemProps = {
  icon?: React.ReactNode;
  text: string;
  href: string;
  onClick: () => void;
};

/**
 * SidebarItem Component
 *
 * A component that represents an item in the sidebar navigation.
 *
 * @component
 */
const SidebarItem = ({ onClick, icon, text, href }: NavbarItemProps) => {
  return (
    <NavLink
      onClick={onClick}
      to={href}
      className={({ isActive }) =>
        clsx(
          "focus:ring-1 focus:ring-offset-2 focus:ring-blue-500 focus-visible:outline-none rounded-md",
          isActive && "bg-gray-200/60 rounded-md"
        )
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
