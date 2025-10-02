import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { NavbarItemProps } from "./SidebarItem";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from "@headlessui/react";

type SidebarItemWithSubLinksProps = React.PropsWithChildren<
  Omit<NavbarItemProps, "href">
>;

/**
 * SidebarItemWithSubLinks Component
 *
 * A component that represents an item in the sidebar navigation with sub-links.
 * It allows for expanding and collapsing the sub-links section.
 *
 * @component
 */
const SidebarItemWithSubLinks = ({
  children,
  icon,
  text,
}: SidebarItemWithSubLinksProps) => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <DisclosureButton className="w-full focus:outline-none">
            <div className="flex justify-between rounded-md p-2 hover:bg-gray-200/60 cursor-pointer">
              <div className="flex gap-2">
                {icon}
                <p className="text-sm">{text}</p>
              </div>
              {open ? (
                <ChevronUpIcon className="h-5" />
              ) : (
                <ChevronDownIcon className="h-5" />
              )}
            </div>
          </DisclosureButton>
          <Transition
            show={open}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <DisclosurePanel
              static
              transition
              className="flex flex-col gap-1 p-1 bg-white mx-2 border-s ml-4"
            >
              {children}
            </DisclosurePanel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default SidebarItemWithSubLinks;
