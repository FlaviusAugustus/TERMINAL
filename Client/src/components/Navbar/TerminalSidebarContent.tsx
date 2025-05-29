import SidebarItem from "./SidebarItem.tsx";
import SidebarLinkGroup from "./SidebarLinkGroup.tsx";
import {
  Squares2X2Icon,
  PlusCircleIcon,
  EyeDropperIcon,
  EnvelopeIcon,
  LightBulbIcon,
  ListBulletIcon,
  UserIcon,
} from "@heroicons/react/20/solid";

const TerminalSidebarContent = () => {
  return (
    <div className="flex flex-col p-4 gap-5 bg-white">
      <SidebarLinkGroup text="General">
        <SidebarItem
          text="Dashboard"
          href="/"
          icon={<Squares2X2Icon className="h-5 w-5" />}
        />
        <SidebarItem
          text="Add new"
          href="/add"
          icon={<PlusCircleIcon className="h-5 w-5" />}
        />
      </SidebarLinkGroup>
      <SidebarLinkGroup text="Manage">
        <SidebarItem
          text="Samples"
          href="/samples"
          icon={<EyeDropperIcon className="h-5 w-5" />}
        />
        <SidebarItem
          text="Projects"
          href="/projects"
          icon={<ListBulletIcon className="h-5 w-5" />}
        />
        <SidebarItem
          text="Recipes"
          href="/recipes"
          icon={<LightBulbIcon className="h-5 w-5" />}
        />
      </SidebarLinkGroup>
      <SidebarLinkGroup text="Users">
        <SidebarItem
          text="Browse"
          href="/users"
          icon={<UserIcon className="h-5 w-5" />}
        />
        <SidebarItem
          text="Invite"
          href="/settings"
          icon={<EnvelopeIcon className="h-5 w-5" />}
        />
      </SidebarLinkGroup>
    </div>
  );
};

export default TerminalSidebarContent;
