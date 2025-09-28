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

function validateRecipeName(name: string) {
  console.log(name);
  return name.length >= 5;
}

function validateProject(project: Project | null) {
  return project !== null;
}

type AddSampleDialogProps = Omit<DialogProps, "title"> & {
  onSubmit: (args: {
    recipeName: string;
    projectId: string;
    saveAsRecipe: boolean;
    comment: string;
  }) => void;
};

const AddSampleDialog = ({
  onSubmit,
  setIsOpen,
  ...rest
}: AddSampleDialogProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [saveAsRecipe, setSaveAsRecipe] = useState(false);
  const [recipeName, setRecipeName] = useState("");

  const [isRecipeNameValid, setIsRecipeNameValid] = useState(true);
  const [isProjectValid, setIsProjectValid] = useState(true);

  const { data, isLoading } = useProjects({ pageSize: 999, pageNumber: 0 });

  const handleClose = () => {
    setSelectedProject(null);
    setIsRecipeNameValid(true);
    setIsProjectValid(true);
    setIsOpen(false);
  };

  const handleSubmit = () => {
    if (!validateProject(selectedProject)) {
      setIsProjectValid(false);
      return;
    }

    if (saveAsRecipe && !validateRecipeName(recipeName)) {
      setIsRecipeNameValid(false);
      return;
    }

    onSubmit({
      recipeName: recipeName,
      saveAsRecipe: saveAsRecipe,
      projectId: selectedProject.id,
      comment: "",
    });

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
      <div className="flex flex-col gap-2">
        <LabeledSelect
          label="Project"
          value={selectedProject}
          displayValue={(project) => project?.name ?? ""}
          onChange={(project: Project) => setSelectedProject(project)}
          isValid={isProjectValid}
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
        {saveAsRecipe && (
          <InputField
            label="Recipe Name"
            value={recipeName}
            onChange={(e) => setRecipeName(e.currentTarget.value)}
            isValid={isRecipeNameValid}
            validationInfo="Recipe Name name must be at least 5 characters long"
          />
        )}
        <div className="rounded-md border border-gray-200 shadow-sm">
          <div className="border-b border-gray-200 rounded-t-md bg-white">
            <p className="p-2 text-sm">Comment</p>
          </div>
          <div className="p-2 bg-gray-50">
            <textarea
              className="h-auto w-full focus:outline-none bg-gray-50"
              rows={3}
            />
          </div>
        </div>
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
