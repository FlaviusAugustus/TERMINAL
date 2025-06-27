import { Field, Label } from "@headlessui/react";
import clsx from "clsx";
import { RefObject } from "react";

export type InputLabelAndValidationProps = {
  label?: string;
  isValid?: boolean;
  inputRef: RefObject<HTMLInputElement>;
};

function getErrorMessage(input: HTMLInputElement | null): string {
  if (!input) return "";

  const validityState = input.validity;

  if (validityState.tooShort)
    return `${input.name} must be at least ${input.minLength} characters long`;
  if (validityState.tooLong)
    return `${input.name} must be at most ${input.maxLength} characters long`;
  if (validityState.valueMissing) return `${input.name} is required`;
  if (validityState.typeMismatch)
    return `${input.name} is not a valid ${input.type}`;
  if (validityState.patternMismatch)
    return `${input.name} does not match the required pattern`;
  if (validityState.rangeUnderflow)
    return `${input.name} must be at larger than ${input.min}`;
  if (validityState.rangeOverflow)
    return `${input.name} must be lower than ${input.max}`;
  if (validityState.stepMismatch) return `${input.name} is not a valid step`;
  if (validityState.badInput) return `${input.name} is not a valid value`;
  if (validityState.customError) return input.validationMessage;
  return "";
}

const InputLabelAndValidation = ({
  label,
  children,
  inputRef,
}: React.PropsWithChildren<InputLabelAndValidationProps>) => {
  return (
    <Field className="h-fit">
      {label && (
        <Label className="text-sm font-normal font-sans text-gray-700">
          {label}:
        </Label>
      )}
      {children}
      <div
        className={clsx(
          inputRef.current && inputRef.current.validity.valid && "invisible",
        )}
      >
        <p role="alert" className="text-xs pt-1 text-red-500">
          {getErrorMessage(inputRef.current)}
        </p>
      </div>
    </Field>
  );
};

export default InputLabelAndValidation;
