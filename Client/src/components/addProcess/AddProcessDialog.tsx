import { Project } from "@api/models/Project";
import {
  DialogButton,
  DialogComp,
  DialogProps,
} from "@components/shared/dialog/DialogComp.tsx";
import FormInput from "@components/shared/form/FormInput.tsx";
import LabeledCheckbox from "@components/shared/form/LabeledCheckbox.tsx";
import { useState } from "react";
import LabeledTagInput from "@components/shared/tags/LabeledTagInput.tsx";
import { Tag } from "@api/models/Tag.ts";
import SubmitButton from "@components/shared/form/SubmitButton.tsx";
import Form from "@components/shared/form/Form.tsx";
import LabeledTextArea from "@components/shared/form/LabeledTextArea";
import LabeledProjectInput from "@components/shared/projects/LabeledProjectInput.tsx";

function validateProject(projects: Project[]) {
  return projects.length > 0;
}

type AddProcessDialogProps = Omit<DialogProps, "title"> & {
  onSubmit: (args: {
    prefix: string;
    recipeName: string;
    saveAsRecipe: boolean;
    comment: string;
    projects: string[];
    tagIds: string[];
  }) => Promise<void>;
  isPending: boolean;
};

const AddProcessDialog = ({
  onSubmit,
  setIsOpen,
  isPending,
  ...rest
}: AddProcessDialogProps) => {
  const [prefix, setPrefix] = useState("");
  const [saveAsRecipe, setSaveAsRecipe] = useState(false);
  const [recipeName, setRecipeName] = useState("");
  const [comment, setComment] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const handleClose = () => {
    setProjects([]);
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    if (!validateProject(projects)) {
      return;
    }
    setPrefix("");
    setSaveAsRecipe(false);
    setRecipeName("");
    setComment("");
    setTags([]);
    setProjects([]);
    await onSubmit({
      prefix: prefix,
      recipeName: recipeName,
      saveAsRecipe: saveAsRecipe,
      projects: projects.map((p) => p.id),
      comment: comment,
      tagIds: tags.map((tag) => tag.id),
    });

    handleClose();
  };

  return (
    <DialogComp
      {...rest}
      title="Add process"
      setIsOpen={setIsOpen}
      handleClose={handleClose}
    >
      <Form handleSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <FormInput
            label="Prefix"
            required={true}
            minLength={1}
            maxLength={50}
            value={prefix}
            onChange={(e) => setPrefix(e.currentTarget.value.toUpperCase())}
          />
          <LabeledProjectInput
            projects={projects ?? []}
            setPojects={setProjects}
          />
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
          <LabeledTextArea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            label={"Comment"}
          />

          <SubmitButton label="Add process" isLoading={isPending} />
          <DialogButton className="hover:border-red-400" onClick={handleClose}>
            Cancel
          </DialogButton>
        </div>
      </Form>
    </DialogComp>
  );
};

export default AddProcessDialog;
