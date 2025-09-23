import { useMemo } from "react";
import {
  LabeledSelect,
  SelectItem,
} from "@components/Shared/LabeledSelect.tsx";
import { Tag } from "@api/models/Tag.ts";
import { useGetTags } from "@hooks/tags/useGetTags.ts";
import tags from "@components/Tags/Tags.tsx";

const SelectRecipe = () => {
  const allTags = useGetTags({
    pageNumber: 0,
    pageSize: 99,
    desc: true,
  });
  const availableTags: Tag[] | undefined = useMemo(() => {
    return allTags.data?.rows;
  }, [allTags.data, tags]);

  return (
    <div className="flex flex-col flex-grow border border-gray-200 rounded-md bg-gray-100 shadow-sm ">
      <div className="p-4 border-b border-gray-200 rounded-t-md bg-white ">
        <p>Select recipe*</p>
      </div>
      <div className="flex flex-col h-full justify-center mx-auto overflow-auto p-4">
        <LabeledSelect<Tag, true>
          name="AddTag"
          onChange={() => {}}
          value={[]}
          handleRemoveValue={() => {}}
        >
          {availableTags?.map((tag: Tag) => (
            <SelectItem key={tag.id} value={tag} displayValue={tag.name} />
          ))}
        </LabeledSelect>
      </div>
    </div>
  );
};

export default SelectRecipe;
