import {
  DialogButton,
  DialogComp,
  DialogProps,
} from "@components/shared/dialog/DialogComp.tsx";
import FormInput from "@components/shared/form/FormInput.tsx";
import { useState } from "react";
import SubmitButton from "@components/shared/form/SubmitButton.tsx";
import Form from "@components/shared/form/Form.tsx";

type AddRecipeDialog = Omit<DialogProps, "title"> & {
  onSubmit: (name: string) => Promise<void>;
  isPending: boolean;
};

/**
 * AddRecipeDialog Component
 *
 * A dialog component for adding a new recipe.
 * It includes an input field for the recipe name and validation to ensure the name is at least 5 characters long.
 *
 *
 * @component
 */
const AddRecipeDialog = ({
  onSubmit,
  setIsOpen,
  isPending,
  ...rest
}: AddRecipeDialog) => {
  const [recipeName, setRecipeName] = useState("");

  const handleClose = () => {
    setRecipeName("");
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    await onSubmit(recipeName);
    handleClose();
  };

  return (
    <DialogComp
      {...rest}
      title="Add recipe"
      setIsOpen={setIsOpen}
      handleClose={handleClose}
    >
      <Form handleSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <FormInput
            name="Name"
            label="Name"
            value={recipeName}
            required
            minLength={3}
            maxLength={50}
            onChange={(e) => setRecipeName(e.currentTarget.value)}
          />
          <SubmitButton label="Add recipe" isLoading={isPending} />
          <DialogButton className="hover:border-red-400" onClick={handleClose}>
            Cancel
          </DialogButton>
        </div>
      </Form>
    </DialogComp>
  );
};

export default AddRecipeDialog;
