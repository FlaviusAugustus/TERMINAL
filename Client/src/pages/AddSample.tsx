import { AddRecipeProvider } from "@hooks/useAddRecipeContext";
import { useState } from "react";
import { RecipeDragProvider } from "@hooks/useRecipeDragContext.tsx";
import useGetParameters from "@hooks/parameters/useGetParameters.ts";
import ParameterSelectList from "@components/AddRecipe/ParameterSelectList.tsx";
import Steps from "@components/AddRecipe/Steps.tsx";
import SelectRecipe from "@components/AddSample/SelectRecipe.tsx";
import AddSampleActions from "@components/AddParameter/AddSampleActions.tsx";
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
      <div className="flex overflow-auto px-2 py-1 pb-1 gap-2 ">
        <div className="flex flex-col gap-2 w-80">
          <SelectRecipe
            selectedRecipe={selectedRecipe}
            setSelectedRecipe={setSelectedRecipe}
          />
          <ParameterSelectList />
          <AddSampleActions setSelectedRecipe={setSelectedRecipe} />
        </div>
        <div className="flex flex-col border border-gray-200 rounded-md bg-white w-full overflow-hidden">
          <Steps />
        </div>
      </div>
    </div>
  );
};

export default AddSampleWithContexts;
