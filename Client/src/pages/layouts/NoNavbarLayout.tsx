import { Outlet } from "react-router-dom";

const NoNavbarLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Outlet />
    </div>
  );
};

export default NoNavbarLayout;
