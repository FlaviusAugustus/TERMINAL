import { AddRecipeProvider } from "@hooks/useAddRecipeContext";
import TagInput from "@components/Shared/TagInput.tsx";
import { useState } from "react";
import { Tag } from "@api/models/Tag.ts";

const AddSampleWithContexts = () => {
  return (
    <AddRecipeProvider>
      <AddSample />
    </AddRecipeProvider>
  );
};

const AddSample = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  return (
    <div className="p-2 flex gap-2">
      <TagInput tags={tags} setTags={setTags} />
    </div>
  );
};

export default AddSampleWithContexts;
