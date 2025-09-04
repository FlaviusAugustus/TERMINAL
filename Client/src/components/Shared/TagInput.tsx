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
    console.log(newTags);
    if (newTags != null) {
      setTags(newTags);
    }
  };

  const handleRemoveTag = (removedTag: Tag) => {
    setTags(tags.filter((tag) => tag.id !== removedTag.id));
  };

  return (
    <div className="flex flex-col w-96 gap-2">
      <LabeledSelect<Tag, true>
        multiple
        label="Add Tags"
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
  );
};

export default TagInput;
