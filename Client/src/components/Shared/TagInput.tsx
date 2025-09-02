import { useEffect, useState } from "react";
import TagValues from "@components/Shared/TagValues.tsx";
import { Tag } from "@api/models/Tag.ts";
import {
  LabeledSelect,
  SelectItem,
} from "@components/Shared/LabeledSelect.tsx";
import { useGetTags } from "@hooks/tags/useGetTags.ts";

const TagInput = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const tagsToChoose = useGetTags({
    pageNumber: 0,
    pageSize: 99,
    desc: true,
  });

  useEffect(() => {
    if (tagsToChoose.data?.rows) {
      setAvailableTags(tagsToChoose.data.rows);
    }
  }, [tagsToChoose.data]);

  const handleAddTag = (newTag: Tag) => {
    if (newTag != null) {
      setTags([...tags, newTag]);
      setAvailableTags((prev) => prev.filter((tag) => tag.id !== newTag.id));
    }
  };

  const handleRemoveTag = (removedTag: Tag) => {
    setTags(tags.filter((tag) => tag.id !== removedTag.id));
    if (removedTag) {
      setAvailableTags((prev) => [...prev, removedTag]);
    }
  };

  return (
    <div className="flex flex-col w-96 gap-2">
      <TagValues
        tags={tags}
        handleRemove={(tag: Tag) => handleRemoveTag(tag)}
      />
      <LabeledSelect label="Add Tag" name="AddTag" onChange={handleAddTag}>
        {availableTags.map((tag: Tag) => (
          <SelectItem key={tag.id} value={tag} displayValue={tag.name} />
        ))}
      </LabeledSelect>
    </div>
  );
};

export default TagInput;
