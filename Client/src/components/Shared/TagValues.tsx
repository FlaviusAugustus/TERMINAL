import { Tag } from "@api/models/Tag.ts";
import Chip from "@components/Shared/Chip.tsx";

type TagValuesProp = {
  tags: Tag[];
};

const TagValues = ({ tags }: TagValuesProp) => {
  return (
    <div className="flex flex-row flex-wrap gap-3 p-4 bg-gray-50 rounded-[10px] align-middle">
      {tags.map((tag: Tag) => (
        <div key={`${tag.name}-`} className={"mt-1"}>
          <Chip value={tag.name} getColorValue={() => "gray"} />
        </div>
      ))}
    </div>
  );
};

export default TagValues;
