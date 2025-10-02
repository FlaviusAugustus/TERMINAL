import { useState, useEffect } from "react";
import {
  DialogButton,
  DialogComp,
} from "@components/shared/dialog/DialogComp.tsx";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import InputField from "@components/shared/form/InputField.tsx";
import LabeledSwitch from "@components/shared/form/LabeledSwitch.tsx";
import { ProjectDetailsDto } from "@api/models/Project";

export interface ProjectDetailsProps {
  project: ProjectDetailsDto;
  onSubmit: (id: string, name: string, isActive: boolean) => void;
  open: boolean;
  setOpen: (arg0: boolean) => void;
}

/**
 * ProjectEdit Component
 *
 * Displays details of a project including name, samples and activity.
 * Provides functionality to reset changes, submit changes, change activity and name.
 *
 * @component
 */
const ProjectEdit = (props: ProjectDetailsProps) => {
  const [isChanged, setIsChanged] = useState(false);
  const [name, setName] = useState(props.project?.name);
  const [isActive, setActive] = useState(props.project?.isActive);

  useEffect(() => {
    setName(props.project?.name || "");
    setActive(props.project?.isActive || false);
    setIsChanged(false);
  }, [props.project]);

  const handleReset = () => {
    setName(props.project?.name);
    setActive(props.project?.isActive || false);
    setIsChanged(false);
  };

  return (
    <DialogComp
      isOpen={props.open}
      setIsOpen={props.setOpen}
      title={"Edit project"}
    >
      <InputField
        label="Name"
        id="name"
        type="email"
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
        <DialogButton
          disabled={!isChanged}
          className="hover:border-blue-400 "
          onClick={() => props.onSubmit(props.project.id, name, isActive)}
        >
          Submit changes
        </DialogButton>
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

export default ProjectEdit;
