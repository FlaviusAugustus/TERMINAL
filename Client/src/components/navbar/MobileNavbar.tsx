import { CommandLineIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/outline";

/**
 * MobileNavbar Component
 *
 *  A responsive navigation bar component designed for mobile devices.
 *  It includes a menu toggle button and a title with an icon.
 * @component
 */
const MobileNavbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm md:hidden p-0 sticky top-0 z-10">
      <div className="flex-none">
        <label
          htmlFor="drawer"
          className="py-4 px-3 border-none shadow-none bg-base-100 drawer-button"
        >
          <Bars3Icon className="h-5 w-5" />
        </label>
      </div>
      <div className="absolute justify-center items-center w-full pointer-events-none">
        <div className="flex items-center bg-white py-4 rounded-t-md">
          <p className="text-xl font-semibold">Terminal</p>
          <CommandLineIcon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
