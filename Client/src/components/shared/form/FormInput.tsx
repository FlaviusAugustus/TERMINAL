import {
  ReactNode,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { Input, InputProps } from "@headlessui/react";
import clsx from "clsx";
import LabeledField from "./LabeledField.tsx";
import { useFormContext } from "@hooks/useFormContext.tsx";

/**
 * Props type for FormInput component
 */
export type InputFieldProps = InputProps & {
  label?: string;
  icon?: ReactNode;
  validate?: boolean;
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
  if (validityState.stepMismatch) return `${input} is not a valid step`;
  if (validityState.badInput) return `${input.name} is not a valid value`;
  if (validityState.customError) return input.validationMessage;
  return "";
}

/**
 * Reusable input field component with validation support.
 *
 * @component
 * @param {InputFieldProps} props - The props for the FormInput component
 */
// eslint-disable-next-line react/display-name
const FormInput = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, icon, className, validate = true, ...rest }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [focused, setFocused] = useState(false);
    const [touched, setTouched] = useState(false);
    const { formValidity } = useFormContext();

    useEffect(() => {
      if (formValidity === false) {
        setErrorMessage(getErrorMessage(inputRef.current));
      }
    }, [formValidity]);

    const handleBlur = () => {
      setFocused(false);
      setErrorMessage(getErrorMessage(inputRef.current));
    };

    const handleFocus = () => {
      setTouched(true);
      setFocused(true);
    };

    const handleChange = () => {
      setErrorMessage(getErrorMessage(inputRef.current));
    };

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const showErrorMessage =
      (!inputRef.current?.validity.valid && !focused && touched) ||
      !formValidity;

    return (
      <LabeledField
        label={label}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onInvalid={handleChange}
      >
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            {icon}
          </div>
          <Input
            {...rest}
            ref={inputRef}
            className={clsx(
              "w-full px-3 py-2 border rounded-md focus:ring-2 focus:outline-none focus:ring-blue-500 focus:ring-offset-2",
              showErrorMessage && "border-red-500",
              icon ? "pl-9" : "pl-3",
              className
            )}
          />
          {validate && (
            <div className={clsx(!showErrorMessage && "invisible")}>
              <p role="alert" className="text-xs h-4 py-1 text-red-500">
                {errorMessage}
              </p>
            </div>
          )}
        </div>
      </LabeledField>
    );
  }
);

export default FormInput;
