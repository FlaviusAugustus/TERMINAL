import { Field, Label } from "@headlessui/react";
import clsx from "clsx";

export type InputLabelAndValidationProps = {
  label?: string;
  isValid?: boolean;
  validationInfo?: string;
};

const InputLabelAndValidation = ({
  label,
  isValid,
  validationInfo,
  children,
}: React.PropsWithChildren<InputLabelAndValidationProps>) => {
  return (
    <Field className="h-fit">
      {label && (
        <Label className="text-sm font-normal font-sans text-gray-700">
          {label}:
        </Label>
      )}
      {children}
      {validationInfo && (
        <div className={clsx(isValid && "invisible")}>
          <p className="text-xs pt-1 text-red-500">{validationInfo}</p>
        </div>
      )}
    </Field>
  );
};

export default InputLabelAndValidation;
