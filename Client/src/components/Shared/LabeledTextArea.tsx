import { Field, Label, Textarea } from "@headlessui/react";

type LabeledTextAreaProps = {
  setValue: (newValue: string) => void;
};

const LabeledTextArea = ({ setValue }: LabeledTextAreaProps) => {
  return (
    <Field className="rounded-md border border-gray-200 shadow-sm">
      <div className="border-b border-gray-200 rounded-t-md bg-white p-1">
        <Label className="pl-1 text-sm">Comment</Label>
      </div>
      <div className="p-2 bg-gray-50">
        <Textarea
          className="h-auto w-full focus:outline-none bg-gray-50"
          name="description"
          onChange={(e) => setValue(e.target.value)}
        ></Textarea>
      </div>
    </Field>
  );
};

export default LabeledTextArea;
