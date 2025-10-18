import { Navigate, Outlet } from "react-router-dom";
import { useIsAuthenticated } from "@hooks/users/auth/useIsAuthenticated.ts";
import Sidebar from "@components/navbar/Sidebar.tsx";
import MobileNavbar from "@components/navbar/MobileNavbar.tsx";
import { useUserRoles } from "@hooks/users/useUserRoles.ts";
import { Role } from "@api/models/Role.ts";
import FullScreenLoader from "@components/shared/loader/FullScreenLoader.tsx";

type AuthorizedNavbarLayoutProps = {
  pageName: string;
  roles?: Array<Role>;
};

const AuthorizedNavbarLayout = ({
  pageName,
  roles,
}: AuthorizedNavbarLayoutProps) => {
  const isAuthenticated = useIsAuthenticated();
  const userRole = useUserRoles();

  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

  if (roles && userRole && !roles.includes(userRole))
    return <Navigate to="/" />;

  return (
    <>
      <FullScreenLoader
        visible={
          isAuthenticated === undefined ||
          (isAuthenticated && userRole === undefined)
        }
      />
      <div className="w-screen flex flex-col md:flex-row bg-gray-100">
        <div className="drawer md:drawer-open md:gap-2">
          <input id="drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col min-h-dvh max-h-dvh items-center justify-start relative md:py-2">
            {/* Menu - only mobile  */}
            <MobileNavbar />
            {/* Page content */}
            <div className="flex flex-col h-dvh md:ps-0 rounded-md md:flex border border-gray-200 shadow-sm w-full overflow-hidden">
              <div className="bg-white h-[60px] text-xl font-medium items-center px-4 rounded-t-md flex-shrink-0 hidden md:flex">
                {pageName}
              </div>
              <div className="h-px border-t border-solid border-gray-200 w-full hidden md:block"></div>
              <Outlet />
            </div>
          </div>
          <div className="drawer-side z-[1]">
            <label
              htmlFor="drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthorizedNavbarLayout;
