import { ArrowPathIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useAddRecipeContext } from "@hooks/useAddRecipeContext";
import { useState } from "react";
import { toastPromise } from "utils/toast.utils";
import AddSampleDialog from "@components/AddSample/AddSampleDialog.tsx";
import { Recipe } from "@api/models/Recipe.ts";
import { Tag } from "@api/models/Tag.ts";
import useAddSample from "@hooks/samples/useAddSample.ts";

type AddSampleActionsProps = {
  setSelectedRecipe: (recipe: Recipe) => void;
  tags: Tag[];
  setTags: (newTags: Tag[]) => void;
};

/**
 * AddSampleActions Component
 *
 * Provides actions for adding a recipe, including resetting the form and submitting the recipe.
 *
 * @component
 */
const AddSampleActions = ({
  setSelectedRecipe,
  tags,
  setTags,
}: AddSampleActionsProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { updateRecipe, recipe } = useAddRecipeContext();
  const { mutateAsync } = useAddSample();
  return (
    <>
      <div className="flex border gap-2 border-gray-200 rounded-md bg-gray-100  p-2 justify-center shadow-sm">
        <button
          className="flex items-center justify-center p-2 border bg-white border-gray-200 rounded hover:bg-gray-50 hover:border-red-300 transition-colors duration-100"
          onClick={() => {
            setSelectedRecipe({ id: "", name: "" });
            setTags([]);
            updateRecipe({ id: "", name: "", steps: [] });
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
        onSubmit={({ recipeName, saveAsRecipe, comment, projectId }) => {
          updateRecipe({ id: "", name: "", steps: [] });
          toastPromise(
            mutateAsync({
              projectId: projectId,
              recipeId: recipe.id,
              steps: recipe.steps,
              tagIds: tags.map((tag) => tag.id),
              comment: comment,
              saveAsRecipe: saveAsRecipe,
              recipeName: recipeName ?? "",
            }),
            {
              loading: "loading",
              success: "Sample added successfully",
              error: "Error while adding a sample",
            }
          );
        }}
      />
    </>
  );
};

export default AddSampleActions;
