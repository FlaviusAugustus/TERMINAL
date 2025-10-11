import { useEffect, useRef, useState } from "react";
import FormInput from "../form/FormInput";
import { DialogButton, DialogComp } from "./DialogComp";

export interface ProjectDetailsProps {
  onSubmit: () => void;
  open: boolean;
  setOpen: (arg0: boolean) => void;
  description?: string;
  confirmationText?: string;
}

const ConfirmDeleteButton = (props: ProjectDetailsProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [confirmation, setConfirmation] = useState("");
  const confirmationTargetText = props.confirmationText
    ? props.confirmationText
    : "delete";

  useEffect(() => {
    setConfirmation("");
  }, [props.open]);

  const confirmDelete = () => {
    if (confirmation === confirmationTargetText) {
      props.onSubmit();
      props.setOpen(false);
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
      isOpen={props.open}
      setIsOpen={props.setOpen}
      title={"Are you sure?"}
    >
      {props.description && (
        <p className="text-sm text-gray-700">{props.description}</p>
      )}
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

export default ConfirmDeleteButton;
