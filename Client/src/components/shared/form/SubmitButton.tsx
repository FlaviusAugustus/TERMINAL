import { Button } from "@headlessui/react";
import clsx from "clsx";
import Loader from "../common/Loader";

/**
 * Props interface for SubmitButton component
 */
export interface SubmitButtonProps {
  label: string;
  isLoading?: boolean;
  dark?: boolean;
}

/**
 * SubmitButton Component
 *
 * A simple submit button component that indicates a loading state.
 *
 * @component
 * @param {SubmitButtonProps} props - The props for the SubmitButton component
 */
const SubmitButton = ({
  label,
  isLoading,
  dark = false,
  ...rest
}: SubmitButtonProps) => (
  <div className="w-full">
    <Button
      type="submit"
      className={clsx(
        "w-full inline-flex items-center justify-center gap-2 rounded-md " +
          "transition-colors duration-100 py-2 px-4 border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        dark
          ? "text-base font-medium bg-black  text-white  hover:bg-black/85"
          : "text-sm font-normal bg-gray-100 text-black focus:outline-none focus:ring-2 disabled:border-gray-300 disabled:bg-gray-200 hover:border-green-400"
      )}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? <Loader /> : label}
    </Button>
  </div>
);

export default SubmitButton;
