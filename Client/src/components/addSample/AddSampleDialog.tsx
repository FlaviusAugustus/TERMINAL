import { Project } from "@api/models/Project";
import {
  DialogButton,
  DialogComp,
  DialogProps,
} from "@components/shared/dialog/DialogComp.tsx";
import FormInput from "@components/shared/form/FormInput.tsx";
import LabeledCheckbox from "@components/shared/form/LabeledCheckbox.tsx";
import { SelectItem, FormSelect } from "@components/shared/form/FormSelect.tsx";
import { useProjects } from "@hooks/projects/useGetProjects";
import { useState } from "react";
import LabeledTextArea from "@components/shared/form/LabeledTextArea.tsx";
import LabeledTagInput from "@components/addSample/LabeledTagInput.tsx";
import { Tag } from "@api/models/Tag.ts";

function validateRecipeName(name: string) {
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
    tagIds: string[];
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
  const [comment, setComment] = useState("");
  const [isRecipeNameValid, setIsRecipeNameValid] = useState(true);
  const [isProjectValid, setIsProjectValid] = useState(true);
  const [tags, setTags] = useState<Tag[]>([]);

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
      comment: comment,
      tagIds: tags.map((tag) => tag.id),
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
        <FormSelect
          label="Project"
          value={selectedProject}
          displayValue={(project) => project?.name ?? ""}
          onChange={(project: Project) => setSelectedProject(project)}
        >
          {data?.rows.map((project) => (
            <SelectItem<Project>
              key={project.id}
              value={project}
              displayValue={project.name}
            />
          ))}
        </FormSelect>
        <LabeledCheckbox
          label="Save as recipe"
          checked={saveAsRecipe}
          onChange={setSaveAsRecipe}
        />
        {saveAsRecipe && (
          <FormInput
            label="Recipe Name"
            required
            value={recipeName}
            onChange={(e) => setRecipeName(e.currentTarget.value)}
          />
        )}
        <LabeledTagInput tags={tags} setTags={setTags} />
        <LabeledTextArea value={comment} setValue={setComment} />
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
