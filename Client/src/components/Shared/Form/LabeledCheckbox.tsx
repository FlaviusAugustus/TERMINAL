import { Label, Field, Checkbox, CheckboxProps } from "@headlessui/react";

export type LabeledCheckboxProps = CheckboxProps & {
  label?: string;
};

/**
 * Reusable checkbox component with validation support.
 *
 * @component
 * @param {LabeledCheckboxProps} props - The props for the LabeledCheckbox component
 */
const LabeledCheckbox = ({ label, ...rest }: LabeledCheckboxProps) => {
  return (
    <Field>
      <div className="flex items-center gap-3">
        {label && (
          <Label className="text-sm font-normal font-sans text-gray-700">
            {label}
          </Label>
        )}
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
      </div>
    </Field>
  );
};

export default LabeledCheckbox;
