import { Field, Label, Textarea } from "@headlessui/react";

type LabeledTextAreaProps = {
  value: string;
  setValue: (newValue: string) => void;
  label?: string;
};

const HeaderedTextArea = ({ label, value, setValue }: LabeledTextAreaProps) => {
  return (
    <Field className="rounded-md border border-gray-200 shadow-sm">
      <div className="border-b border-gray-200 rounded-t-md bg-white p-1">
        <Label className="pl-1 text-sm">{label}</Label>
      </div>
      <div className="p-2 bg-gray-50">
        <Textarea
          className="h-auto w-full focus:outline-none bg-gray-50"
          name="description"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </Field>
  );
};

export default HeaderedTextArea;
