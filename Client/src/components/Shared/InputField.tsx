import React, { ReactNode } from "react";
import { Input } from "@headlessui/react";
import clsx from "clsx";
import InputLabelAndValidation, {
  InputLabelAndValidationProps,
} from "./InputLabelAndValidation";

/**
 * Props type for InputField component
 */
export type InputFieldProps = InputLabelAndValidationProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    icon?: ReactNode;
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
  validationInfo,
  ...rest
}: InputFieldProps) => {
  return (
    <InputLabelAndValidation
      label={label}
      isValid={isValid}
      validationInfo={validationInfo}
    >
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          {icon}
        </div>
        <Input
          {...rest}
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
