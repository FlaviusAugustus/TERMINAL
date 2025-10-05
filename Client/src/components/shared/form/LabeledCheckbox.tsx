import { Checkbox, CheckboxProps } from "@headlessui/react";
import LabeledField, { LabeledFieldProps } from "./LabeledField";

export type LabeledCheckboxProps = CheckboxProps & LabeledFieldProps;
/**
 * Reusable checkbox component with validation support.
 *
 * @component
 * @param {LabeledCheckboxProps} props - The props for the LabeledCheckbox component
 */
const LabeledCheckbox = ({ label, ...rest }: LabeledCheckboxProps) => {
  return (
    <LabeledField label={label}>
      <Checkbox
        {...rest}
        className="group block size-5 rounded border bg-white data-[checked]:bg-gray-100"
      >
        <svg
          className="stroke-gray-900 opacity-0 group-data-[checked]:opacity-100"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M3 8L6 11L11 3.5"
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Checkbox>
    </LabeledField>
  );
};

export default LabeledCheckbox;
