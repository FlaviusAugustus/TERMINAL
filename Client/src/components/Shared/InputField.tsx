import React, { ReactNode, useRef } from "react";
import { Input } from "@headlessui/react";
import clsx from "clsx";
import InputLabelAndValidation, {
  InputLabelAndValidationProps,
} from "./InputLabelAndValidation";

/**
 * Props type for InputField component
 */
export type InputFieldProps = Omit<InputLabelAndValidationProps, "inputRef"> &
  React.InputHTMLAttributes<HTMLInputElement> & {
    icon?: ReactNode;
    validationInfo?: string;
  };

/**
 * Reusable input field component with validation support.
 *
 * @component
 * @param {InputFieldProps} props - The props for the InputField component
 */
const InputField = ({
  label,
  icon,
  isValid = true,
  className,
  ...rest
}: InputFieldProps) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <InputLabelAndValidation label={label} isValid={isValid} inputRef={ref}>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          {icon}
        </div>
        <Input
          {...rest}
          ref={ref}
          formNoValidate
          autoComplete="disabled"
          className={clsx(
            "w-full px-3 py-2 border rounded-md focus:ring-2 focus:outline-none focus:ring-blue-500 focus:ring-offset-2",
            {
              "border-red-500": !isValid,
            },
            icon ? "pl-9" : "pl-3",
            className,
          )}
        />
      </div>
    </InputLabelAndValidation>
  );
};

export default InputField;
