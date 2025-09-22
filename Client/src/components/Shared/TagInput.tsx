import { useMemo } from "react";
import { Tag } from "@api/models/Tag.ts";
import {
  LabeledSelect,
  SelectItem,
} from "@components/Shared/LabeledSelect.tsx";
import { useGetTags } from "@hooks/tags/useGetTags.ts";

type TagInputProps = {
  tags: Tag[];
  setTags: (newTags: Tag[]) => void;
};

const TagInput = ({ tags, setTags }: TagInputProps) => {
  const allTags = useGetTags({
    pageNumber: 0,
    pageSize: 99,
    desc: true,
  });
  const availableTags: Tag[] | undefined = useMemo(() => {
    return allTags.data?.rows?.filter((tag) => !tags.includes(tag));
  }, [allTags.data, tags]);

  const handleAddTag = (newTags: Tag[]) => {
    if (newTags != null) {
      setTags(newTags);
    }
  };

  const handleRemoveTag = (removedTag: Tag) => {
    setTags(tags.filter((tag) => tag.id !== removedTag.id));
  };

  return (
    <div className="flex flex-col flex-grow border border-gray-200 rounded-md bg-gray-100 shadow-sm ">
      <div className="p-4 border-b border-gray-200 rounded-t-md bg-white ">
        <p>Add Tags</p>
      </div>
      <div className="flex flex-col w-96 h-full justify-center mx-auto overflow-auto p-4">
        <LabeledSelect<Tag, true>
          multiple
          name="AddTag"
          onChange={handleAddTag}
          value={tags}
          handleRemoveValue={(tag: Tag) => handleRemoveTag(tag)}
        >
          {availableTags?.map((tag: Tag) => (
            <SelectItem key={tag.id} value={tag} displayValue={tag.name} />
          ))}
        </LabeledSelect>
      </div>
    </div>
  );
};

export default TagInput;
