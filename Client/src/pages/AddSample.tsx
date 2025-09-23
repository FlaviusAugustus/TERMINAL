import { AddRecipeProvider } from "@hooks/useAddRecipeContext";
import TagInput from "@components/Shared/TagInput.tsx";
import { useState } from "react";
import { Tag } from "@api/models/Tag.ts";
import { RecipeDragProvider } from "@hooks/useRecipeDragContext.tsx";
import useGetParameters from "@hooks/parameters/useGetParameters.ts";
import ParameterSelectList from "@components/AddRecipe/ParameterSelectList.tsx";
import AddRecipeActions from "@components/AddRecipe/AddRecipeActions.tsx";
import Steps from "@components/AddRecipe/Steps.tsx";
import SelectRecipe from "@components/AddSample/SelectRecipe.tsx";

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
  const [tags, setTags] = useState<Tag[]>([]);
  return (
    <div className="flex flex-col h-full overflow-auto bg-gray-50">
      <div className="flex h-1/4 px-2 py-1 pt-2 gap-x-2 ">
        <div className="flex flex-col gap-2 w-80 overflow-hidden">
          <SelectRecipe />
        </div>
        <div className="flex flex-col rounded-md bg-white w-full overflow-hidden">
          <TagInput tags={tags} setTags={setTags} />
        </div>
      </div>
      <div className="flex h-3/4 overflow-auto px-2 py-1 pb-1 gap-2 ">
        <div className="flex flex-col gap-2 w-80">
          <ParameterSelectList />
          <AddRecipeActions />
        </div>
        <div className="flex flex-col border border-gray-200 rounded-md bg-white w-full overflow-hidden">
          <Steps />
        </div>
      </div>
    </div>
  );
};

export default AddSampleWithContexts;
