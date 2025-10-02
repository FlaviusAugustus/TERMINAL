import { Field, Label } from "@headlessui/react";
import clsx from "clsx";
import { RefObject, useState } from "react";

export type InputLabelAndValidationProps = {
  validate?: boolean;
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
  if (validityState.typeMismatch) return `please enter a valid ${input.type}`;
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

const FieldWithLabelAndValidation = ({
  label,
  children,
  validate,
  inputRef,
}: React.PropsWithChildren<InputLabelAndValidationProps>) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [focused, setFocused] = useState(false);

  const handleBlur = () => {
    setFocused(false);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleChange = () => {
    setErrorMessage(getErrorMessage(inputRef.current));
  };

  const hideErrorMessage =
    (inputRef.current && inputRef.current.validity.valid) ||
    (inputRef.current && !inputRef.current.validity.valid && focused);

  return (
    <Field
      className="h-fit"
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onInvalid={handleChange}
    >
      {label && (
        <Label className="text-sm font-normal font-sans text-gray-700">
          {label}:
        </Label>
      )}
      {children}
      {validate && (
        <div className={clsx(hideErrorMessage && "invisible")}>
          <p role="alert" className="text-xs h-4 py-1 text-red-500">
            {errorMessage}
          </p>
        </div>
      )}
    </Field>
  );
};

export default FieldWithLabelAndValidation;
