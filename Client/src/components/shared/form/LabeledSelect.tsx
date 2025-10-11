import { ReactNode } from "react";
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
import SelectedValues from "@components/shared/form/SelectedValues.tsx";
import LabeledField from "./LabeledField.tsx";

type LabeledSelectProps<T, Multiple extends boolean> = ComboboxProps<
  T,
  Multiple
> & {
  displayValue?: (arg0: T) => string;
  children: ReactNode;
  handleRemoveValue?: (removedValue: T) => void;
  comboboxStyles?: string;
  comboboxOptionsStyles?: string;
  label?: string;
};

/**
 * Reusable Select field.
 *
 * @component
 * @param {LabeledSelectProps} props - The props for the LabeledSelect component
 */
const LabeledSelect = <T, Multiple extends boolean>({
  label,
  children,
  displayValue,
  handleRemoveValue,
  comboboxStyles = "",
  comboboxOptionsStyles = "",
  ...rest
}: LabeledSelectProps<T, Multiple>) => {
  const value = rest.value;
  const multiple = rest.multiple;

  return (
    <LabeledField label={label}>
      <Combobox immediate {...rest}>
        <div
          className={clsx(
            "relative w-full bg-white px-3 border-[1px] rounded-md py-2",
            comboboxStyles
          )}
        >
          {multiple && Array.isArray(value) && value.length > 0 && (
            <SelectedValues values={value} handleRemove={handleRemoveValue} />
          )}
          <ComboboxInput
            displayValue={displayValue}
            className={"w-full h-full focus:outline-none"}
          />

          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="h-5" />
          </ComboboxButton>
        </div>
        <ComboboxOptions
          className={clsx(
            "w-[--input-width] flex flex-col gap-1 bg-white border rounded-md shadow-sm mt-4 py-1 px-3 box-content",
            comboboxOptionsStyles
          )}
          anchor="bottom"
        >
          <div className="max-h-[25vh]">{children}</div>
        </ComboboxOptions>
      </Combobox>
    </LabeledField>
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
