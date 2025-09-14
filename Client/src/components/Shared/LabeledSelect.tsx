import { ReactNode, useRef } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  ComboboxButton,
  ComboboxProps,
  ComboboxOptionProps,
} from "@headlessui/react";
import clsx from "clsx";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import InputLabelAndValidation, {
  InputLabelAndValidationProps,
} from "./InputLabelAndValidation";
import SelectedValues from "@components/Shared/SelectedValues.tsx";

type LabeledSelectProps<T, Multiple extends boolean> = Omit<
  InputLabelAndValidationProps,
  "inputRef"
> &
  ComboboxProps<T, Multiple> & {
    displayValue?: (arg0: T) => string;
    children: ReactNode;
    validationInfo?: string;
    handleRemoveValue?: (removedValue: T) => void;
    compact?: boolean;
  };

/**
 * Reusable input field component with validation support.
 *
 * @component
 * @param {InputFieldProps} props - The props for the InputField component
 */
const LabeledSelect = <T, Multiple extends boolean>({
  label,
  isValid = true,
  children,
  displayValue,
  handleRemoveValue,
  compact = false,
  ...rest
}: LabeledSelectProps<T, Multiple>) => {
  const ref = useRef<HTMLInputElement>(null);
  const value = rest.value;
  const multiple = rest.multiple;

  return (
    <InputLabelAndValidation
      label={label}
      isValid={isValid}
      inputRef={ref}
      validate
    >
      <Combobox immediate {...rest}>
        <div
          className={clsx(
            "relative w-full bg-white px-3 border-[1px] border-black/15 rounded-md",
            {
              "border-red-500": !isValid,
              "py-2": !compact,
            }
          )}
        >
          {multiple && Array.isArray(value) && value.length > 0 && (
            <SelectedValues values={value} handleRemove={handleRemoveValue} />
          )}
          <ComboboxInput
            ref={ref}
            displayValue={displayValue}
            className={"w-full h-full focus:outline-none"}
          />

          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="h-5" />
          </ComboboxButton>
        </div>
        <ComboboxOptions
          className={clsx(
            "w-[--input-width] flex flex-col gap-1 bg-white border rounded-md shadow-sm",
            {
              "mt-2": !compact,
              "p-1": !compact,
            }
          )}
          anchor="bottom"
        >
          {children}
        </ComboboxOptions>
      </Combobox>
    </InputLabelAndValidation>
  );
};

type SelectItemProps<T> = ComboboxOptionProps<"div", T> & {
  displayValue: string;
};

const SelectItem = <T,>({ displayValue, ...rest }: SelectItemProps<T>) => {
  return (
    <ComboboxOption
      className="w-full p-2 text-sm hover:bg-gray-100 hover:cursor-pointer rounded-md"
      {...rest}
    >
      {displayValue}
    </ComboboxOption>
  );
};

export { LabeledSelect, SelectItem };
