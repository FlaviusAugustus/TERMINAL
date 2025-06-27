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

type LabeledSelectProps<T> = Omit<InputLabelAndValidationProps, "inputRef"> &
  ComboboxProps<T, false> & {
    displayValue?: (arg0: T) => string;
    children: ReactNode;
    validationInfo?: string;
  };

/**
 * Reusable input field component with validation support.
 *
 * @component
 * @param {InputFieldProps} props - The props for the InputField component
 */
const LabeledSelect = <T,>({
  label,
  isValid = true,
  children,
  displayValue,
  ...rest
}: LabeledSelectProps<T>) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <InputLabelAndValidation label={label} isValid={isValid} inputRef={ref}>
      <Combobox {...rest}>
        <div className="relative">
          <ComboboxInput
            ref={ref}
            displayValue={displayValue}
            className={clsx(
              "w-full px-3 py-2 border-[1px] border-black/15 rounded-md focus:ring-2 focus:outline-none focus:ring-blue-500 focus:ring-offset-2",
              {
                "border-red-500": !isValid,
              },
            )}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="h-5" />
          </ComboboxButton>
        </div>
        <ComboboxOptions
          className="w-[--input-width] mt-2 p-1 flex flex-col gap-1 bg-white border rounded-md shadow-sm"
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
      className="w-full p-2 text-sm hover:bg-gray-100 rounded-md"
      {...rest}
    >
      {displayValue}
    </ComboboxOption>
  );
};

export { LabeledSelect, SelectItem };
