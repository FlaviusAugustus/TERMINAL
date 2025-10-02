import {
  DialogButton,
  DialogComp,
  DialogProps,
} from "@components/shared/dialog/DialogComp.tsx";
import FormInput from "@components/shared/form/FormInput.tsx";
import { useState } from "react";
import SubmitButton from "@components/shared/form/SubmitButton.tsx";

function isRecipeNameValid(name: string) {
  return name.length >= 5;
}

type AddRecipeDialog = Omit<DialogProps, "title"> & {
  onSubmit: (name: string) => void;
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
  const [isNameValid, setIsNameValid] = useState(true);

  const handleClose = () => {
    setRecipeName("");
    setIsNameValid(true);
    setIsOpen(false);
  };

  const handleSubmit = () => {
    if (!isRecipeNameValid(recipeName)) {
      setIsNameValid(false);
      return;
    }

    onSubmit(recipeName);
    handleClose();
  };

  return (
    <DialogComp
      {...rest}
      title="Add recipe"
      setIsOpen={setIsOpen}
      handleClose={handleClose}
    >
      <div className="flex flex-col">
        <FormInput
          label="Name"
          value={recipeName}
          onChange={(e) => setRecipeName(e.currentTarget.value)}
          isValid={isNameValid}
          validationInfo="Recipe name must be at least 5 characters long"
        />
      </div>
      <SubmitButton label="Add recipe" isLoading={isPending} />
      <DialogButton className="hover:border-red-400" onClick={handleClose}>
        Cancel
      </DialogButton>
    </DialogComp>
  );
};

export default AddRecipeDialog;
