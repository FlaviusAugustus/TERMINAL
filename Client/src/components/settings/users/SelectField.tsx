import React from "react";
import { Field, Label, Select } from "@headlessui/react";

interface SelectFieldProps {
  label: string;
  name: string;
  values: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isValid?: boolean;
}

/**
 * SelectField Component
 *
 * A component that renders a select dropdown field with a label.
 * It is used to select a value from a predefined list of options.
 *
 * @component
 */
const SelectField = (props: SelectFieldProps) => {
  return (
    <Field>
      <Label className="text-sm font-semibold text-gray-700">
        {props.label}
      </Label>
      <Select
        name={props.name}
        aria-label="Role"
        className="w-full px-3 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-500
                                        select select-bordered"
      >
        {props.values.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </Select>
    </Field>
  );
};

export default SelectField;
