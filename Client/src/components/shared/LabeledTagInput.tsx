import { useMemo } from "react";
import { Tag } from "@api/models/Tag.ts";
import {
  LabeledSelect,
  SelectItem,
} from "@components/shared/LabeledSelect.tsx";
import { useGetTags } from "@hooks/tags/useGetTags.ts";
import { useGetTagAmount } from "@hooks/tags/useGetTagAmount.ts";

type TagInputProps = {
  tags: Tag[];
  setTags: (newTags: Tag[]) => void;
};

const LabeledTagInput = ({ tags, setTags }: TagInputProps) => {
  const { data: tagsAmount } = useGetTagAmount();
  const allTags = useGetTags({
    pageNumber: 0,
    pageSize: tagsAmount ?? 0,
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
    <>
      <LabeledSelect<Tag, true>
        multiple
        label="Tags"
        name="AddTag"
        onChange={handleAddTag}
        value={tags}
        handleRemoveValue={(tag: Tag) => handleRemoveTag(tag)}
      >
        {availableTags?.map((tag: Tag) => (
          <SelectItem key={tag.id} value={tag} displayValue={tag.name} />
        ))}
      </LabeledSelect>
    </>
  );
};

export default LabeledTagInput;
