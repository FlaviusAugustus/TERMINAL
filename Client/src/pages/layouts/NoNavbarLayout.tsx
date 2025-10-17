import { Outlet } from "react-router-dom";

const NoNavbarLayout = () => {
  return (
    <div className="flex flex-col min-h-dvh">
      <Outlet />
    </div>
  );
};

export default NoNavbarLayout;
