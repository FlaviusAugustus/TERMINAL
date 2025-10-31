import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

/**
 * DialogButton Component
 *
 * A button component styled for use within a dialog.
 *
 * @component
 */
const DialogButton = ({
  children,
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={clsx(
        "font-normal text-sm h-10 bg-gray-100 text-black border w-full inline-flex items-center justify-center gap-2 rounded-md transition-colors duration-100 py-2 px-4 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2 disabled:border-gray-300 disabled:bg-gray-200",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export { DialogButton };
