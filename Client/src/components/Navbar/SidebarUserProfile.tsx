import {Popover, PopoverButton, PopoverPanel} from "@headlessui/react";
import {ArrowRightEndOnRectangleIcon} from "@heroicons/react/20/solid";
import {Cog6ToothIcon} from "@heroicons/react/24/outline";
import useUserData from "@hooks/useUserData";

function getUserRoleDisplayValue(role: string): string {
    if (role === "Administrator") return "Administrator";
    if (role === "Moderator") return "Moderator";
    if (role === "Registered") return "Lab Worker";
    if (role === "Guest") return "Guest";

    throw new Error("Invalid role");
}

function getEmailInitials(email: string): string {
    const [first, last] = email.split("@");
    return `${first[0]}${last[0]}`.toUpperCase();
}

function getAvatarColor(email: string): string {
    const hash = email
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = hash % 360;
    return `hsl(${hue}, 50%, 50%)`;
}

const SidebarUserProfile = () => {
    const {data, status} = useUserData();

    if (status === "pending") return <div>Loading...</div>;
    if (status === "error") return <div>Error...</div>;

    return (
        <div className="p-2 bg-white rounded-b-md w-full">
            <div className="flex gap-3 rounded-md p-2 hover:bg-gray-200 hover:cursor-pointer w-full">
                <div
                    style={{backgroundColor: getAvatarColor(data?.email)}}
                    className="flex text-white w-10 h-10 rounded-md justify-center items-center noinvert"
                >
                    <span>{getEmailInitials(data?.email)}</span>
                </div>
                <div className="flex flex-col justify-start">
                    <p className="text-sm w-full text-left">{data?.email}</p>
                    <p className="text-xs text-gray-500 w-full text-left">
                        {getUserRoleDisplayValue(data?.role)}
                    </p>
                </div>
            </div>
        </div>
    );
};

const NavbarUserProfilePopover = () => {
    return (
        <Popover>
            <PopoverButton className="w-full focus-visible:outline-none">
                <SidebarUserProfile/>
            </PopoverButton>
            <PopoverPanel
                anchor={{gap: "8px", to: "top"}}
                className="absolute focus-visible:outline-none"
            >
                <div className="w-64 p-1 bg-white rounded-md border border-gray-200">
                    <div className="flex flex-col">
                        <div
                            className="flex gap-1 p-1 hover:bg-gray-200 rounded-sm select-none cursor-pointer items-center">
                            <Cog6ToothIcon className="h-5 w-5"/>
                            <p className="text-xs">Settings</p>
                        </div>
                        <div
                            className="flex gap-1 p-1 hover:bg-gray-200 rounded-sm select-none cursor-pointer items-center">
                            <ArrowRightEndOnRectangleIcon className="h-5 w-5"/>
                            <p className="text-xs">Log out</p>
                        </div>
                    </div>
                </div>
            </PopoverPanel>
        </Popover>
    );
};

export default NavbarUserProfilePopover;
