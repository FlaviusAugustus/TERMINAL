import { Project } from "@api/models/Project";
import {
  DialogButton,
  DialogComp,
  DialogProps,
} from "@components/Shared/DialogComp";
import InputField from "@components/Shared/InputField";
import LabeledCheckbox from "@components/Shared/LabeledCheckbox";
import { SelectItem, LabeledSelect } from "@components/Shared/LabeledSelect";
import { useProjects } from "@hooks/projects/useGetProjects";
import { useState } from "react";

function validateName(name: string) {
  return name.length >= 5;
}

function validateProject(project: Project | null) {
  return project !== null;
}

type AddSampleDialogProps = Omit<DialogProps, "title"> & {
  onSubmit: (name: string, project: string, saveAsRecipe: boolean) => void;
};

const AddSampleDialog = ({
  onSubmit,
  setIsOpen,
  ...rest
}: AddSampleDialogProps) => {
  const [sampleName, setSampleName] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [saveAsRecipe, setSaveAsRecipe] = useState(false);

  const [isNameValid, setIsNameValid] = useState(true);
  const [isProjectValid, setIsProjectValid] = useState(true);

  const { data, isLoading } = useProjects({ pageSize: 999, pageNumber: 0 });

  const handleClose = () => {
    setSampleName("");
    setSelectedProject(null);
    setIsNameValid(true);
    setIsProjectValid(true);
    setIsOpen(false);
  };

  const handleSubmit = () => {
    if (!validateName(sampleName)) {
      setIsNameValid(false);
      return;
    }

    if (!validateProject(selectedProject)) {
      setIsProjectValid(false);
      return;
    }

    onSubmit(sampleName, selectedProject.id, saveAsRecipe);
    handleClose();
  };

  if (isLoading) return <div></div>;

  return (
    <DialogComp
      {...rest}
      title="Add sample"
      setIsOpen={setIsOpen}
      handleClose={handleClose}
    >
      <div className="flex flex-col">
        <InputField
          label="Name"
          value={sampleName}
          onChange={(e) => setSampleName(e.currentTarget.value)}
          isValid={isNameValid}
          validationInfo="Sample name must be at least 5 characters long"
        />
        <LabeledSelect
          label="Project"
          value={selectedProject}
          displayValue={(project) => project?.name ?? ""}
          onChange={(project: Project) => setSelectedProject(project)}
          isValid={isProjectValid}
          validationInfo="Choose a project from the list"
        >
          {data?.rows.map((project) => (
            <SelectItem<Project>
              key={project.id}
              value={project}
              displayValue={project.name}
            />
          ))}
        </LabeledSelect>
        <LabeledCheckbox
          label="Save as recipe"
          checked={saveAsRecipe}
          onChange={setSaveAsRecipe}
        />
      </div>
      <DialogButton className="hover:border-green-400" onClick={handleSubmit}>
        Add sample
      </DialogButton>
      <DialogButton className="hover:border-red-400" onClick={handleClose}>
        Cancel
      </DialogButton>
    </DialogComp>
  );
};

export default AddSampleDialog;
