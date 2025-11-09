import { ArrowPathIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useAddRecipeContext } from "@hooks/recipes/useAddRecipeContext.tsx";
import { useState } from "react";
import { toastPromise } from "@utils/toast.utils.tsx";
import AddProcessDialog from "@components/addProcess/AddProcessDialog.tsx";
import { EMPTY_RECIPE, Recipe } from "@api/models/Recipe.ts";
import useAddSample from "@hooks/processes/useAddProcess.ts";
import { CreateProcess } from "@api/models/Process.ts";

type AddSampleActionsProps = {
  setSelectedRecipe: (recipe: Recipe) => void;
};

/**
 * AddProcessActions Component
 *
 * Provides actions for adding a recipe, including resetting the form and submitting the recipe.
 *
 * @component
 */
const AddProcessActions = ({ setSelectedRecipe }: AddSampleActionsProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { updateRecipe, recipe, setCurrentStep } = useAddRecipeContext();
  const { mutateAsync, isPending } = useAddSample();

  const handleSubmit = async (args: {
    prefix: string;
    recipeName: string;
    saveAsRecipe: boolean;
    comment: string;
    projects: string[];
    tagIds: string[];
  }) => {
    updateRecipe(EMPTY_RECIPE);
    setCurrentStep(0);
    const payload: CreateProcess = {
      prefix: args.prefix,
      projects: args.projects,
      steps: recipe.steps,
      tagIds: args.tagIds,
      comment: args.comment,
      saveAsRecipe: args.saveAsRecipe,
    };
    if (args.saveAsRecipe) {
      payload.recipeId = recipe.id;
      payload.recipeName = args.recipeName;
    }
    toastPromise(mutateAsync(payload), {
      loading: "loading",
      success: "Process added successfully",
      error: "Error while adding a sample",
    });
  };

  return (
    <>
      <div className="flex border gap-2 border-gray-200 rounded-md bg-gray-100  p-2 justify-center shadow-sm">
        <button
          className="flex items-center justify-center p-2 border bg-white border-gray-200 rounded hover:bg-gray-50 hover:border-red-300 transition-colors duration-100"
          onClick={() => {
            setSelectedRecipe({ id: "", name: "" });
            updateRecipe(EMPTY_RECIPE);
            setCurrentStep(0);
          }}
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
      <AddProcessDialog
        isOpen={dialogOpen}
        setIsOpen={setDialogOpen}
        onSubmit={handleSubmit}
        isPending={isPending}
      />
    </>
  );
};

export default AddProcessActions;
