import { AddRecipeProvider } from "@hooks/useAddRecipeContext";
import { useState } from "react";
import { RecipeDragProvider } from "@hooks/useRecipeDragContext.tsx";
import useGetParameters from "@hooks/parameters/useGetParameters.ts";
import ParameterSelectList from "@components/shared/parameterList/ParameterSelectList.tsx";
import Steps from "@components/shared/steps/Steps.tsx";
import SelectRecipe from "@components/addSample/SelectRecipe.tsx";
import AddSampleActions from "@components/addSample/AddSampleActions.tsx";
import { Recipe } from "@api/models/Recipe.ts";

const AddSampleWithContexts = () => {
  const { data: parameters, isLoading, isError } = useGetParameters();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (parameters === undefined) return <div>No parameters found</div>;

  return (
    <AddRecipeProvider>
      <RecipeDragProvider parameters={parameters.parameters}>
        <AddSample />
      </RecipeDragProvider>
    </AddRecipeProvider>
  );
};

const AddSample = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>({
    id: "",
    name: "",
  });
  return (
    <div className="flex flex-col h-full overflow-auto bg-gray-50">
      <div className="flex overflow-auto px-2 py-1 pb-1 gap-2 flex-wrap sm:flex-nowrap">
        <div className="flex flex-col gap-2 w-80">
          <SelectRecipe
            selectedRecipe={selectedRecipe}
            setSelectedRecipe={setSelectedRecipe}
          />
          <ParameterSelectList />
          <div className="hidden sm:block">
            <AddSampleActions setSelectedRecipe={setSelectedRecipe} />
          </div>
        </div>
        <div className="flex flex-col border border-gray-200 rounded-md bg-white w-full overflow-hidden">
          <Steps />
        </div>
        <div className="w-full sm:hidden">
          <AddSampleActions setSelectedRecipe={setSelectedRecipe} />
        </div>
      </div>
    </div>
  );
};

export default AddSampleWithContexts;
