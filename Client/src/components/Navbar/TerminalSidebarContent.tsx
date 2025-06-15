import SidebarItem from "./SidebarItem.tsx";
import SidebarItemWithSubLinks from "./SidebarItemWithSubLinks.tsx";
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
import VisibleForRoles from "@components/Shared/VisibleForRoles.tsx";

/**
 * TerminalSidebarContent Component
 *
 * A component that represents the content of the sidebar in the terminal application.
 * It includes various navigation links grouped by categories such as General, Manage, and Users.
 * This component is designed to be used within a sidebar layout, providing easy access to different sections of the application.
 *
 * @component
 */
const TerminalSidebarContent = () => {

  return (
    <div className="flex flex-col p-4 gap-5 bg-white">
      <SidebarLinkGroup text="General">
        <SidebarItem
          text="Dashboard"
          href="/"
          icon={<Squares2X2Icon className="h-5 w-5" />}
        />
        <SidebarItemWithSubLinks
          text="Add new"
          icon={<PlusCircleIcon className="h-5 w-5" />}
        >
          <SidebarItem text="Recipe" href="/new-recipe" />
          <SidebarItem text="Sample" href="/new-sample" />
          <VisibleForRoles roles={["Administrator", "Moderator"]}>
            <SidebarItem text="Project" href="/new-project" />
          </VisibleForRoles>
        </SidebarItemWithSubLinks>
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
      <VisibleForRoles roles={["Administrator", "Moderator"]}>
          <SidebarLinkGroup text="Users">
            <SidebarItem
                text="Browse"
                href="/users"
                icon={<UserIcon className="h-5 w-5" />}
            />
            <VisibleForRoles roles={["Administrator"]}>
              <SidebarItem
                  text="Invite"
                  href="/settings"
                  icon={<EnvelopeIcon className="h-5 w-5" />}
              />
            </VisibleForRoles>
          </SidebarLinkGroup>
      </VisibleForRoles>
    </div>
  );
};

export default TerminalSidebarContent;
