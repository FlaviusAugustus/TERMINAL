import { CommandLineIcon } from "@heroicons/react/24/outline";

/**
 * Logo Component
 *
 * A simple logo component that displays a terminal-like interface with an icon.
 *
 * @component
 */
const Logo = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="card-bordered rounded-lg bg-base-100 p-1">
        <div className="card-body">
          <div className="flex flex-row justify-between items-center g-1">
            <p className="text-2xl">Terminal</p>
            <CommandLineIcon className="h-6 w-6 mt-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;
