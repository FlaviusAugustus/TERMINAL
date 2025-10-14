import { Field, FieldProps, Label } from "@headlessui/react";

export type LabeledFieldProps = { label?: string } & FieldProps;

const LabeledField = ({
  label,
  children,
  ...rest
}: React.PropsWithChildren<LabeledFieldProps>) => {
  return (
    <Field {...rest} className="h-fit data-invalid:text-red-500">
      {label && (
        <Label className="text-xs font-normal font-sans text-gray-700">
          {label}:
        </Label>
      )}
      {children}
    </Field>
  );
};

export default LabeledField;
