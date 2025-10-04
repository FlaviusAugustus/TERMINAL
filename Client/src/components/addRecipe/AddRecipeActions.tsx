import { ArrowPathIcon, CheckIcon } from "@heroicons/react/24/outline";
import useAddRecipe from "@hooks/recipes/useAddRecipe";
import { useAddRecipeContext } from "@hooks/recipes/useAddRecipeContext.tsx";
import { useState } from "react";
import { toastPromise } from "utils/toast.utils";
import AddRecipeDialog from "./AddRecipeDialog";

/**
 * AddRecipeActions Component
 *
 * Provides actions for adding a recipe, including resetting the form and submitting the recipe.
 *
 * @component
 */
const AddRecipeActions = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { updateRecipe, recipe } = useAddRecipeContext();
  const { mutateAsync } = useAddRecipe();

  const handleSubmit = (name: string) => {
    updateRecipe({ id: "", name: "", steps: [] });
    toastPromise(mutateAsync({ ...recipe, name: name }), {
      loading: "loading",
      success: "Recipe added successfully",
      error: "Error while adding a recipe",
    });
  };

  return (
    <>
      <div className="flex border gap-2 border-gray-200 rounded-md bg-gray-100  p-2 justify-center shadow-sm">
        <button
          className="flex items-center justify-center p-2 border bg-white border-gray-200 rounded hover:bg-gray-50 hover:border-red-300 transition-colors duration-100"
          onClick={() => updateRecipe({ id: "", name: "", steps: [] })}
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
      />
    </>
  );
};

export default AddRecipeActions;
