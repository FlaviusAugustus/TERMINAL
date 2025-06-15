import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton = ({ children, className, ...rest }: IconButtonProps) => {
  return (
    <button
      {...rest}
      className={clsx(
        "p-2 border rounded-md bg-white hover:bg-gray-50 enabled:hover:border-blue-200 disabled:bg-gray-200 transition duration-75 disabled:border-gray-300",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default IconButton;
