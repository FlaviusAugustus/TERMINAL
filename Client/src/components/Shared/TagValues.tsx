import { Tag } from "@api/models/Tag.ts";
import Chip from "@components/Shared/Chip.tsx";
import { XMarkIcon } from "@heroicons/react/24/outline";

type TagValuesProp = {
  tags: Tag[];
  handleRemove: (tag: Tag) => void;
};

const TagValues = ({ tags, handleRemove }: TagValuesProp) => {
  return (
    <div className="flex flex-row flex-wrap gap-3 p-4 rounded-[10px] align-middle">
      {tags.map((tag: Tag) => (
        <TagValue key={tag.id} tag={tag} onRemove={handleRemove} />
      ))}
    </div>
  );
};

type TagValueProp = {
  tag: Tag;
  onRemove: (tag: Tag) => void;
};
const TagValue = ({ tag, onRemove }: TagValueProp) => {
  return (
    <div className={"flex items-center mt-1"}>
      <Chip value={tag.name} getColorValue={() => "gray"}>
        <button
          className="items-center text-gray-900 hover:text-gray-400 pl-1"
          onClick={() => onRemove(tag)}
        >
          <XMarkIcon className="h-4 rounded-lg bg-white p-0.5" />
        </button>
      </Chip>
    </div>
  );
};

export default TagValues;
