import {
  LabeledSelect,
  SelectItem,
} from "@components/shared/form/LabeledSelect.tsx";
import { useGetRecipeAmount } from "@hooks/recipes/useGetRecipeAmount.ts";
import { useRecipes } from "@hooks/recipes/useGetRecipes.ts";
import { Recipe } from "@api/models/Recipe.ts";
import { useAddRecipeContext } from "@hooks/recipes/useAddRecipeContext.tsx";
import { useEffect } from "react";
import { useRecipeDetails } from "@hooks/recipes/useGetRecipeDetails.ts";

type SelectRecipeProps = {
  selectedRecipe: Recipe;
  setSelectedRecipe: (recipe: Recipe) => void;
};

const SelectRecipe = ({
  selectedRecipe,
  setSelectedRecipe,
}: SelectRecipeProps) => {
  const { setRecipe, setCurrentStep } = useAddRecipeContext();

  const { data: recipesAmount } = useGetRecipeAmount();
  const { data: allRecipes } = useRecipes({
    pageNumber: 0,
    pageSize: recipesAmount?.data ?? 0,
    desc: true,
  });

  const dataQueryRecipeDetails = useRecipeDetails(selectedRecipe.id);
  useEffect(() => {
    if (dataQueryRecipeDetails.data) {
      setRecipe(dataQueryRecipeDetails.data);
      setCurrentStep(0);
    }
  }, [dataQueryRecipeDetails.data]);

  return (
    <div className="flex flex-col border border-gray-200 rounded-md bg-gray-100 shadow-sm ">
      <div className="p-4 border-b border-gray-200 rounded-t-md bg-white ">
        <p>Select Recipe</p>
      </div>
      <div className="flex flex-col h-full justify-center mx-auto overflow-auto p-4">
        <LabeledSelect
          name="SelectRecipe"
          value={selectedRecipe}
          displayValue={(selectedRecipe) => selectedRecipe.name}
          onChange={(recipe: Recipe) => {
            setSelectedRecipe(recipe);
          }}
        >
          {allRecipes?.rows?.map((recipe: Recipe) => (
            <SelectItem
              key={recipe.id}
              value={recipe}
              displayValue={recipe.name}
            />
          ))}
        </LabeledSelect>
      </div>
    </div>
  );
};

export default SelectRecipe;
