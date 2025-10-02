import useGetParameters from "@hooks/parameters/useGetParameters.ts";
import { RecipeDragProvider } from "@hooks/useRecipeDragContext";
import { AddRecipeProvider } from "@hooks/useAddRecipeContext";
import AddRecipeActions from "@components/addRecipe/AddRecipeActions";
import ParameterSelectList from "@components/addRecipe/ParameterSelectList";
import Steps from "@components/addRecipe/Steps.tsx";

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
    <div className="p-2 flex gap-2 h-full overflow-auto bg-gray-50">
      <div className="flex flex-col gap-2 w-80">
        <ParameterSelectList />
        <AddRecipeActions />
      </div>
      <div className="flex flex-col border border-gray-200 rounded-md bg-white w-full overflow-hidden">
        <Steps />
      </div>
    </div>
  );
};

export default AddRecipeWithContexts;
