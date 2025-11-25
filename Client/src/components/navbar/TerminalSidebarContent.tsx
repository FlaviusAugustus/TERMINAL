import SidebarItem from "./SidebarItem.tsx";
import SidebarItemWithSubLinks from "./SidebarItemWithSubLinks.tsx";
import SidebarLinkGroup from "./SidebarLinkGroup.tsx";
import {
  Squares2X2Icon,
  PlusCircleIcon,
  EyeDropperIcon,
  LightBulbIcon,
  ListBulletIcon,
  UserIcon,
  TagIcon,
} from "@heroicons/react/20/solid";
import VisibleForRoles from "@components/shared/common/VisibleForRoles.tsx";
import { CalculatorIcon } from "@heroicons/react/16/solid";

type TerminalSidebarContentProps = {
  onAfterNavigate: () => void;
};

/**
 * TerminalSidebarContent Component
 *
 * A component that represents the content of the sidebar in the terminal application.
 * It includes various navigation links grouped by categories such as General, Manage, and users.
 * This component is designed to be used within a sidebar layout, providing easy access to different sections of the application.
 *
 * @component
 */
const TerminalSidebarContent = ({
  onAfterNavigate,
}: TerminalSidebarContentProps) => {
  return (
    <div className="flex flex-col p-4 gap-5 bg-white">
      <SidebarLinkGroup text="General">
        <SidebarItem
          onClick={onAfterNavigate}
          text="Dashboard"
          href="/"
          icon={<Squares2X2Icon className="h-5 w-5" />}
        />
        <SidebarItemWithSubLinks
          onlineOnly
          text="Add new"
          icon={<PlusCircleIcon className="h-5 w-5" />}
        >
          <SidebarItem
            onlineOnly
            onClick={onAfterNavigate}
            text="Recipe"
            href="/new-recipe"
          />
          <SidebarItem
            onlineOnly
            onClick={onAfterNavigate}
            text="Process"
            href="/new-process"
          />
          <VisibleForRoles roles={["Administrator", "Moderator"]}>
            <SidebarItem
              onlineOnly
              onClick={onAfterNavigate}
              text="Project"
              href="/new-project"
            />
          </VisibleForRoles>
          <VisibleForRoles roles={["Administrator", "Moderator"]}>
            <SidebarItem
              onlineOnly
              onClick={onAfterNavigate}
              text="Parameter"
              href="/new-parameter"
            />
          </VisibleForRoles>
          <SidebarItem
            onlineOnly
            onClick={onAfterNavigate}
            text="Tag"
            href="/new-tag"
          />
          <VisibleForRoles roles={["Administrator"]}>
            <SidebarItem
              onlineOnly
              onClick={onAfterNavigate}
              text="User"
              href="/new-user"
            />
          </VisibleForRoles>
        </SidebarItemWithSubLinks>
      </SidebarLinkGroup>
      <SidebarLinkGroup text="Manage">
        <SidebarItem
          onClick={onAfterNavigate}
          text="Recipes"
          href="/recipes"
          icon={<LightBulbIcon className="h-5 w-5" />}
        />
        <SidebarItem
          onClick={onAfterNavigate}
          text="Processes"
          href="/processes"
          icon={<EyeDropperIcon className="h-5 w-5" />}
        />
        <SidebarItem
          onClick={onAfterNavigate}
          text="Projects"
          href="/projects"
          icon={<ListBulletIcon className="h-5 w-5" />}
        />
        <SidebarItem
          onClick={onAfterNavigate}
          text="Parameters"
          href="/parameters"
          icon={<CalculatorIcon className="h-5 w-5" />}
        />
        <SidebarItem
          onClick={onAfterNavigate}
          text="Tags"
          href="/tags"
          icon={<TagIcon className="h-5 w-5" />}
        />
      </SidebarLinkGroup>
      <VisibleForRoles roles={["Administrator", "Moderator"]}>
        <SidebarLinkGroup text="Users">
          <SidebarItem
            onClick={onAfterNavigate}
            text="Browse"
            href="/users"
            icon={<UserIcon className="h-5 w-5" />}
          />
        </SidebarLinkGroup>
      </VisibleForRoles>
    </div>
  );
};

export default TerminalSidebarContent;
