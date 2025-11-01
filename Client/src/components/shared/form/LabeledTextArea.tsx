import { Textarea, TextareaProps } from "@headlessui/react";
import LabeledField from "./LabeledField";

type LabeledTextAreaProps = TextareaProps & {
  label: string;
};

const LabeledTextArea = ({ label, ...rest }: LabeledTextAreaProps) => {
  return (
    <LabeledField label={label}>
      <Textarea
        {...rest}
        className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:outline-none focus:ring-blue-500 focus:ring-offset-2"
      />
    </LabeledField>
  );
};

export default LabeledTextArea;
