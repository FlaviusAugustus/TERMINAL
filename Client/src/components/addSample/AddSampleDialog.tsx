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
import SubmitButton from "@components/shared/form/SubmitButton.tsx";
import Form from "@components/shared/form/Form.tsx";

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
  }) => Promise<void>;
  isPending: boolean;
};

const AddSampleDialog = ({
  onSubmit,
  setIsOpen,
  isPending,
  ...rest
}: AddSampleDialogProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [saveAsRecipe, setSaveAsRecipe] = useState(false);
  const [recipeName, setRecipeName] = useState("");
  const [comment, setComment] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);

  const { data, isLoading } = useProjects({ pageSize: 999, pageNumber: 0 });

  const handleClose = () => {
    setSelectedProject(null);
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    if (!validateProject(selectedProject)) {
      return;
    }
    await onSubmit({
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
      <Form handleSubmit={handleSubmit}>
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
              required={saveAsRecipe}
              minLength={3}
              maxLength={50}
              value={recipeName}
              onChange={(e) => setRecipeName(e.currentTarget.value)}
            />
          )}
          <LabeledTagInput tags={tags} setTags={setTags} />
          <LabeledTextArea value={comment} setValue={setComment} />

          <SubmitButton label="Add sample" isLoading={isPending} />
          <DialogButton className="hover:border-red-400" onClick={handleClose}>
            Cancel
          </DialogButton>
        </div>
      </Form>
    </DialogComp>
  );
};

export default AddSampleDialog;
