type NavbarLinkGroupProps = {
  text: string;
  children: React.ReactNode;
};

/**
 * SidebarLinkGroup Component
 *
 * A component that represents a group of links in the sidebar navigation.
 * It displays a title for the group and renders its children links.
 *
 * @component
 */
const SidebarLinkGroup = ({ text, children }: NavbarLinkGroupProps) => {
  return (
    <div>
      <p className="text-xs text-gray-500 ml-2">{text}</p>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
};

export default SidebarLinkGroup;
