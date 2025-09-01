import { Tag } from "@api/models/Tag.ts";
import Chip from "@components/Shared/Chip.tsx";
import { XMarkIcon } from "@heroicons/react/24/outline";

type TagValuesProp = {
  tags: Tag[];
  handleRemove: (tagId: string) => void;
};

const TagValues = ({ tags, handleRemove }: TagValuesProp) => {
  return (
    <div className="flex flex-row flex-wrap gap-3 p-4 bg-gray-50 rounded-[10px] align-middle">
      {tags.map((tag: Tag) => (
        <TagValue key={tag.id} tag={tag} onRemove={handleRemove} />
      ))}
    </div>
  );
};

type TagValueProp = {
  tag: Tag;
  onRemove: (tagId: string) => void;
};
const TagValue = ({ tag, onRemove }: TagValueProp) => {
  return (
    <div className={"flex items-center mt-1"}>
      <button
        className="mr-0.25 items-center text-gray-700 hover:text-red-500"
        title={`Remove ${tag}`}
        onClick={() => onRemove(tag.id)}
      >
        <XMarkIcon className="h-4 rounded-md" />
      </button>
      <Chip value={tag.name} getColorValue={() => "gray"} />
    </div>
  );
};

export default TagValues;
