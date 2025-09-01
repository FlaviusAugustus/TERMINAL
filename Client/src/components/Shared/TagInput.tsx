import { ChangeEvent, useState } from "react";
import InputField from "@components/Shared/InputField.tsx";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import TagValues from "@components/Shared/TagValues.tsx";
import { Tag } from "@api/models/Tag.ts";

const TagInput = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [userInput, setUserInput] = useState<string>("");

  const addTag = (newTag: Tag) => {
    setTags([...tags, newTag]);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (userInput.trim() !== "" && userInput.length <= 12) {
        addTag({ name: userInput, id: "123" });
        setUserInput("");
      }
    }
  };

  return (
    <div className="flex flex-col w-96 gap-2">
      <TagValues tags={tags} />
      <InputField
        validate={false}
        className="flex-grow-1"
        placeholder="Add Tag"
        icon={<MagnifyingGlassIcon className="h-4" />}
        onKeyDown={handleKeyPress}
        onChange={handleInputChange}
        value={userInput}
      />
    </div>
  );
};

export default TagInput;
