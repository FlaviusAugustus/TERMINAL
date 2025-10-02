import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/20/solid";
import useLogout from "@hooks/users/useLogout";
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
  const logout = useLogout();

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Error...</div>;

  return (
    <div className="p-2 bg-white rounded-b-md w-full">
      <div className="flex gap-3 rounded-md p-2 hover:bg-gray-200 group hover:cursor-pointer w-full items-center">
        <div
          style={{ backgroundColor: getAvatarColor(data?.email) }}
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
        <ArrowRightEndOnRectangleIcon
          className="h-9 w-8 ml-auto group-hover:visible invisible text-gray-800 hover:bg-gray-300 p-1 rounded"
          onClick={logout}
        />
      </div>
    </div>
  );
};

export default SidebarUserProfile;
