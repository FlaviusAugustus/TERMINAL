import useGetParameters from "@hooks/parameters/useGetParameters.ts";
import { RecipeDragProvider } from "@hooks/recipes/useRecipeDragContext.tsx";
import { AddRecipeProvider } from "@hooks/recipes/useAddRecipeContext.tsx";
import AddRecipeActions from "@components/addRecipe/AddRecipeActions";
import ParameterSelectList from "@components/shared/parameterList/ParameterSelectList.tsx";
import Steps from "@components/shared/steps/Steps.tsx";

const AddRecipeWithContexts = () => {
  const { data: parameters, isLoading, isError } = useGetParameters();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (parameters === undefined) return <div>No parameters found</div>;

  return (
    <AddRecipeProvider>
      <RecipeDragProvider parameters={parameters.parameters}>
        <AddRecipe />
      </RecipeDragProvider>
    </AddRecipeProvider>
  );
};

const AddRecipe = () => {
  return (
    <div className="flex flex-col h-full overflow-auto bg-gray-50">
      <div className="flex overflow-auto px-2 py-1 pb-1 gap-2 flex-wrap sm:flex-nowrap">
        <div className="flex flex-col gap-2 w-80">
          <ParameterSelectList />
          <div className="hidden sm:block">
            <AddRecipeActions />
          </div>
        </div>
        <div className="flex flex-col border border-gray-200 rounded-md bg-white w-full overflow-hidden">
          <Steps />
        </div>
        <div className="w-full sm:hidden">
          <AddRecipeActions />
        </div>
      </div>
    </div>
  );
};

export default AddRecipeWithContexts;
