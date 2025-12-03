import {
  ForwardedRef,
  forwardRef,
  ReactElement,
  ReactNode,
  useImperativeHandle,
  useState,
} from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptionProps,
  ComboboxOptions,
  ComboboxProps,
} from "@headlessui/react";
import clsx from "clsx";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import SelectedValues from "@components/shared/form/SelectedValues.tsx";
import LabeledField from "./LabeledField.tsx";

export type LabeledSelectHandle = {
  isValid: () => boolean;
  markTouched: (v?: boolean) => void;
  focus: () => void;
};

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
  required?: boolean;
  errorMessage?: string;
};

const LabeledSelectInner = <T, Multiple extends boolean>(
  {
    label,
    children,
    displayValue,
    handleRemoveValue,
    comboboxStyles = "",
    comboboxOptionsStyles = "",
    required = false,
    errorMessage = "This field is required",
    ...rest
  }: LabeledSelectProps<T, Multiple>,
  ref: ForwardedRef<LabeledSelectHandle>
) => {
  const value = rest.value;
  const multiple = rest.multiple;
  const [touched, setTouched] = useState(false);

  const isEmpty = multiple
    ? !Array.isArray(value) || value.length === 0
    : !value;

  const showErrorMessage = required && touched && isEmpty;

  useImperativeHandle(ref, () => ({
    isValid: () => {
      if (!required) return true;
      return !isEmpty;
    },
    markTouched: (v = true) => setTouched(v),
    focus: () => {},
  }));

  const handleInteraction = () => {
    setTouched(true);
  };

  return (
    <LabeledField label={label}>
      <Combobox
        immediate
        {...rest}
        onChange={(val) => {
          handleInteraction();
          if (rest.onChange) rest.onChange(val);
        }}
      >
        <div
          className={clsx(
            "relative w-full bg-white px-3 border-[1px] rounded-md py-2 focus-within:ring-1 focus-within:ring-blue-500 focus-within:ring-offset-2",
            showErrorMessage && "border-red-500",
            comboboxStyles
          )}
          onClick={handleInteraction}
        >
          {multiple && Array.isArray(value) && value.length > 0 && (
            <SelectedValues
              values={value}
              handleRemove={(v) => {
                handleInteraction();
                if (handleRemoveValue) handleRemoveValue(v);
              }}
            />
          )}
          <ComboboxInput
            displayValue={displayValue}
            className="w-full h-full focus:outline-none"
            onBlur={() => setTouched(true)}
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

      <div className={clsx(!showErrorMessage && "invisible", "h-5")}>
        <p role="alert" className="text-xs text-red-500">
          {errorMessage}
        </p>
      </div>
    </LabeledField>
  );
};

const LabeledSelect = forwardRef(LabeledSelectInner) as <
  T,
  Multiple extends boolean,
>(
  props: LabeledSelectProps<T, Multiple> & {
    ref?: ForwardedRef<LabeledSelectHandle>;
  }
) => ReactElement;

type SelectItemProps<T> = ComboboxOptionProps<"div", T> & {
  displayValue: string;
};

const SelectItem = <T,>({ displayValue, ...rest }: SelectItemProps<T>) => {
  return (
    <ComboboxOption
      className="sticky w-full p-2 text-sm bg-white hover:bg-gray-100 hover:cursor-pointer rounded-md z-[1]"
      {...rest}
    >
      {displayValue}
    </ComboboxOption>
  );
};

export { LabeledSelect, SelectItem };
