import {
  ArrowRightEndOnRectangleIcon,
  Cog8ToothIcon,
} from "@heroicons/react/16/solid";
import useUserData from "@hooks/users/useUserData.ts";
import { toastPromise } from "@utils/toast.utils.tsx";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "@hooks/users/auth/useLogoutMutation.ts";
import useIsOnline from "@hooks/useIsOnline";
import clsx from "clsx";
import ChangePasswordDialog from "@components/users/ChangePasswordDialog.tsx";

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

/**
 * SidebarUserProfile Component
 *
 * A component that displays the user's profile information in the sidebar.
 * It includes the user's email, role, and an avatar with initials.
 * It also provides a logout button that triggers the logout function.
 *
 * @component
 */
const SidebarUserProfile = () => {
  const { data, status } = useUserData();
  const navigate = useNavigate();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const logoutMutation = useLogoutMutation();
  const online = useIsOnline();

  const handleLogout = useCallback(async () => {
    await toastPromise(logoutMutation.mutateAsync(), {
      loading: "Logging out...",
      success: "Logout successful",
      error: "Logout failed",
    });
    navigate("/login");
  }, [navigate]);

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Error...</div>;

  return (
    <div className="p-2 bg-white md:rounded-b-md w-full">
      <div className="flex gap-1 rounded-md p-2 hover:bg-gray-200 group hover:cursor-pointer w-full items-center">
        <div className="relative">
          <div
            style={{ backgroundColor: getAvatarColor(data?.email) }}
            className="flex text-white w-10 h-10 rounded-md justify-center items-center noinvert"
          >
            <span>{getEmailInitials(data?.email)}</span>
          </div>
          <div
            className={clsx(
              "absolute z-10 h-2 w-2 outline border outline-white border-black/10 rounded-full -top-0.5 -right-0.5",
              online ? "bg-green-400" : "bg-red-400"
            )}
          ></div>
        </div>
        <div className="flex flex-col justify-start pl-1">
          <p className="text-sm w-full text-left">{data?.email}</p>
          <p className="text-xs text-gray-500 w-full text-left">
            {getUserRoleDisplayValue(data?.role)}
          </p>
        </div>
        <Cog8ToothIcon
          className="h-8 w-6 ml-auto md:group-hover:visible md:invisible text-gray-800 hover:bg-gray-300 rounded"
          onClick={() => setDialogOpen(true)}
        />
        <ArrowRightEndOnRectangleIcon
          className="h-8 w-6 ml-auto md:group-hover:visible md:invisible text-gray-800 hover:bg-gray-300 rounded"
          onClick={(e) => {
            e.stopPropagation();
            handleLogout();
          }}
        />
      </div>
      <ChangePasswordDialog
        open={isDialogOpen}
        setOpen={setDialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
        userId={data.id}
      />
    </div>
  );
};

export default SidebarUserProfile;
