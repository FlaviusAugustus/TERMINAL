import { AddRecipeProvider } from "@hooks/useAddRecipeContext";
import TagInput from "@components/Shared/TagInput.tsx";

const AddSampleWithContexts = () => {
  return (
    <AddRecipeProvider>
      <AddSample />
    </AddRecipeProvider>
  );
};

const AddSample = () => {
  return (
    <div className="p-2 flex gap-2">
      <TagInput />
    </div>
  );
};

export default AddSampleWithContexts;
