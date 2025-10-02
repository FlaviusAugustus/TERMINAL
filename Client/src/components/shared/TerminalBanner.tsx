import { CommandLineIcon } from "@heroicons/react/24/outline";

/**
 * TerminalBanner Component
 *
 * A banner component that displays the name and icon of the app.
 *
 * @component
 */
const TerminalBanner = () => (
  <div className="flex items-center justify-center space-x-2 mb-2 p-0 bg-white rounded-md">
    <p className="text-3xl font-semibold">Terminal</p>
    <CommandLineIcon className="h-7 w-7" />
  </div>
);

export default TerminalBanner;
