import { ArrowPathIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useAddRecipeContext } from "@hooks/recipes/useAddRecipeContext.tsx";
import { useState } from "react";
import { toastPromise } from "@utils/toast.utils.tsx";
import AddSampleDialog from "@components/addSample/AddSampleDialog.tsx";
import { EMPTY_RECIPE, Recipe } from "@api/models/Recipe.ts";
import useAddSample from "@hooks/processes/useAddSample.ts";
import { CreateSample } from "@api/models/Process.ts";

type AddSampleActionsProps = {
  setSelectedRecipe: (recipe: Recipe) => void;
};

/**
 * AddSampleActions Component
 *
 * Provides actions for adding a recipe, including resetting the form and submitting the recipe.
 *
 * @component
 */
const AddSampleActions = ({ setSelectedRecipe }: AddSampleActionsProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { updateRecipe, recipe, setCurrentStep } = useAddRecipeContext();
  const { mutateAsync, isPending } = useAddSample();

  const handleSubmit = async (args: {
    recipeName: string;
    saveAsRecipe: boolean;
    comment: string;
    projectId: string;
    tagIds: string[];
  }) => {
    updateRecipe(EMPTY_RECIPE);
    setCurrentStep(0);
    const payload: CreateSample = {
      projectId: args.projectId,
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
      <AddSampleDialog
        isOpen={dialogOpen}
        setIsOpen={setDialogOpen}
        onSubmit={handleSubmit}
        isPending={isPending}
      />
    </>
  );
};

export default AddSampleActions;
