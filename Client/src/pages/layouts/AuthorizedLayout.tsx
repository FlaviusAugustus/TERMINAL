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
      <div className="w-screen flex flex-col sm:flex-row bg-gray-100">
        <div className="drawer md:drawer-open md:gap-2">
          <input id="drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col sm:h-auto h-auto min-h-screen items-center justify-start relative">
            {/* Menu - only mobile  */}
            <MobileNavbar />
            {/* Page content */}
            <div className="flex flex-col w-full h-auto sm:h-screen sm:p-2 sm:ps-0">
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
            {/* navbar */}
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
