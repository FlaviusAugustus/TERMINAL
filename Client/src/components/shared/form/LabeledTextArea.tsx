import { Textarea } from "@headlessui/react";
import LabeledField, { LabeledFieldProps } from "./LabeledField";

type LabeledTextAreaProps = {
  value: string;
  setValue: (newValue: string) => void;
} & LabeledFieldProps;

const LabeledTextArea = ({ label, value, setValue }: LabeledTextAreaProps) => {
  return (
    <LabeledField label={label}>
      <div className="p-2 bg-gray-50">
        <Textarea
          className="h-auto w-full focus:outline-none bg-gray-50"
          name="description"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </LabeledField>
  );
};

export default LabeledTextArea;
