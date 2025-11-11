import { useEffect, useState } from "react";
import { Tag } from "@api/models/Tag.ts";
import {
  DialogButton,
  DialogComp,
} from "@components/shared/dialog/DialogComp.tsx";
import FormInput from "@components/shared/form/FormInput.tsx";
import LabeledSwitch from "@components/shared/form/LabeledSwitch.tsx";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { DialogSubmitButton } from "@components/shared/dialog/DialogSubmitButton.tsx";

export interface TagDetailsProps {
  tag: Tag;
  onSubmit: (id: string, name: string, isActive: boolean) => void;
  open: boolean;
  setOpen: (arg0: boolean) => void;
  isSubmitting: boolean;
}

const TagEdit = (props: TagDetailsProps) => {
  const [isChanged, setIsChanged] = useState(false);
  const [name, setName] = useState(props.tag?.name);
  const [isActive, setActive] = useState(props.tag?.isActive);

  useEffect(() => {
    setName(props.tag?.name || "");
    setActive(props.tag?.isActive || false);
    setIsChanged(false);
  }, [props.tag]);

  const handleReset = () => {
    setName(props.tag?.name);
    setActive(props.tag?.isActive || false);
    setIsChanged(false);
  };

  return (
    <DialogComp
      isOpen={props.open}
      setIsOpen={props.setOpen}
      title={"Edit tags"}
    >
      <FormInput
        label="Name"
        id="name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setIsChanged(true);
        }}
      />
      <LabeledSwitch
        label="Status"
        id="status"
        checked={isActive}
        onChange={() => {
          setActive(!isActive);
          setIsChanged(true);
        }}
      />
      <div className="flex gap-1 mt-4">
        <DialogSubmitButton
          disabled={!isChanged}
          className="hover:border-blue-400 "
          onClick={() => props.onSubmit(props.tag.id, name, isActive)}
          isSubmitting={props.isSubmitting}
        >
          Submit changes
        </DialogSubmitButton>
        <DialogButton
          disabled={!isChanged}
          className="!w-fit hover:border-blue-400"
          onClick={handleReset}
        >
          <ArrowPathIcon className="h-4 w-4" />
        </DialogButton>
      </div>
    </DialogComp>
  );
};

export default TagEdit;
