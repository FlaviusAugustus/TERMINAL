import { Navigate, Outlet } from "react-router-dom";
import { useIsAuthenticated } from "@hooks/useIsAuthenticated";
import Sidebar from "@components/Navbar/Sidebar.tsx";
import MobileNavbar from "@components/Navbar/MobileNavbar.tsx";
import { useUserRoles } from "@hooks/useUserRoles.ts";
import Loader from "@components/Shared/Loader.tsx";
import {Role} from "@api/models/Role.ts";

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

  if (isAuthenticated === undefined || userRole === undefined) {
    return <Loader />;
  }

  if (roles && !roles.includes(userRole)) return <Navigate to="/" />;

  return (
    <div className="w-screen flex flex-col sm:flex-row bg-gray-100">
      <div className="drawer md:drawer-open md:gap-2">
        <input id="drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col sm:h-auto h-auto min-h-screen items-center justify-center relative">
          {/* Menu - only mobile  */}
          <MobileNavbar />
          {/* Page content */}
          <div className="sm:p-2 sm:ps-0 w-full h-full flex flex-col">
            <div className="sm:hidden h-full">
              <Outlet />
            </div>
            <div className="rounded-md sm:flex hidden flex-col border border-gray-200 shadow-sm w-full h-full overflow-hidden">
              <div className="bg-white h-[60px] text-xl flex font-medium items-center px-4 rounded-t-md flex-shrink-0">
                {pageName}
              </div>
              <div className="h-px border-t border-solid border-gray-200 w-full"></div>
              <Outlet />
            </div>
          </div>
        </div>
        <div className="drawer-side">
          {/* Navbar */}
          <label
            htmlFor="drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default AuthorizedNavbarLayout;
