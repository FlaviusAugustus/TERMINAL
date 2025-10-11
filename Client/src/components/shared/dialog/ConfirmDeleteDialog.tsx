import { useEffect, useRef, useState } from "react";
import FormInput from "../form/FormInput";
import { DialogButton, DialogComp, DialogProps } from "./DialogComp";

export type ConfirmDeleteDialogProps = DialogProps & {
  description?: string;
  confirmationText?: string;
  onSubmit: () => void;
};

const ConfirmDeleteDialog = ({
  confirmationText,
  description,
  onSubmit,
  setIsOpen,
  isOpen,
  ...rest
}: ConfirmDeleteDialogProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [confirmation, setConfirmation] = useState("");
  const confirmationTargetText = confirmationText ? confirmationText : "delete";

  useEffect(() => {
    setConfirmation("");
  }, [open]);

  const confirmDelete = () => {
    if (confirmation === confirmationTargetText) {
      onSubmit();
      setIsOpen(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    const isTextValid = newText !== confirmationTargetText && newText !== "";
    if (isTextValid) {
      inputRef.current?.setCustomValidity(
        `Text doesn't match, please type '${confirmationTargetText}'`
      );
    } else {
      inputRef.current?.setCustomValidity("");
    }

    setConfirmation(newText);
  };

  return (
    <DialogComp
      {...rest}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={"Are you sure?"}
    >
      {description && <p className="text-sm text-gray-700">{description}</p>}
      <FormInput
        ref={inputRef}
        label="Confirmation"
        required
        name="Confirmation"
        value={confirmation}
        onChange={handleChange}
      />
      <DialogButton onClick={confirmDelete} className="hover:border-red-400">
        Delete
      </DialogButton>
    </DialogComp>
  );
};

export default ConfirmDeleteDialog;
