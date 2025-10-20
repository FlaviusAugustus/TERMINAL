import { ArrowPathIcon, CheckIcon } from "@heroicons/react/24/outline";
import useAddRecipe from "@hooks/recipes/useAddRecipe";
import { useAddRecipeContext } from "@hooks/recipes/useAddRecipeContext.tsx";
import { useState } from "react";
import { toastPromise } from "utils/toast.utils";
import AddRecipeDialog from "./AddRecipeDialog";
import { EMPTY_RECIPE } from "@api/models/Recipe.ts";

/**
 * AddRecipeActions Component
 *
 * Provides actions for adding a recipe, including resetting the form and submitting the recipe.
 *
 * @component
 */
const AddRecipeActions = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { updateRecipe, recipe, setCurrentStep } = useAddRecipeContext();
  const { mutateAsync, isPending } = useAddRecipe();

  const handleSubmit = async (name: string) => {
    updateRecipe(EMPTY_RECIPE);
    setCurrentStep(0);
    toastPromise(mutateAsync({ ...recipe, name: name }), {
      loading: "loading",
      success: "Recipe added successfully",
      error: "Error while adding a recipe",
    });
  };

  const handleClearData = () => {
    updateRecipe(EMPTY_RECIPE);
    setCurrentStep(0);
  };

  return (
    <>
      <div className="flex border gap-2 border-gray-200 rounded-md bg-gray-100  p-2 justify-center shadow-sm">
        <button
          className="flex items-center justify-center p-2 border bg-white border-gray-200 rounded hover:bg-gray-50 hover:border-red-300 transition-colors duration-100"
          onClick={handleClearData}
        >
          <ArrowPathIcon className="h-5 w-5" />
        </button>
        <button
          className="flex items-center justify-center p-2 border bg-white border-gray-200 rounded hover:bg-gray-50 hover:border-green-300 transition-colors duration-100 group"
          onClick={() => setDialogOpen(true)}
        >
          <CheckIcon className="h-5 w-5" />
        </button>
      </div>
      <AddRecipeDialog
        isOpen={dialogOpen}
        setIsOpen={setDialogOpen}
        onSubmit={handleSubmit}
        isPending={isPending}
      />
    </>
  );
};

export default AddRecipeActions;
