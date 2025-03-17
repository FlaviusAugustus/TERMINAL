import { CommandLineIcon } from "@heroicons/react/24/outline";

/**
 * TerminalBanner Component
 *
 * A banner component that displays the name and icon of the app.
 *
 * @component
 * @returns {JSX.Element} - The rendered TerminalBanner component.
 */
const TerminalBanner = () => (
  <div className="flex items-center justify-center space-x-2 mb-6">
    <p className="text-2xl font-semibold">Terminal</p>
    <CommandLineIcon className="h-6 w-6" />
  </div>
);

export default TerminalBanner;
