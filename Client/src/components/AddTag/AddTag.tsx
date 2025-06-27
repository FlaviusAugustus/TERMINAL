import InputField from "@components/Shared/InputField.tsx";
import {DialogButton} from "@components/Shared/DialogComp.tsx";
import {useState} from "react";
import {toastPromise} from "../../utils/toast.utils.tsx";
import useAddTag from "@hooks/tags/useAddTag.ts";

const AddTag = () => {

    const {mutateAsync} = useAddTag();
    const [tagName, setTagName] = useState("");
    const [isTagNameValid, setIsTagNameValid] = useState(true);

    const checkIfNameIsValid = (name: string) => {
        return name.length >= 3 && name.length <= 50;
    };

    const handleSubmit = async () => {
        const tagNameValid = checkIfNameIsValid(tagName);
        setIsTagNameValid(tagNameValid);

        if (!tagNameValid) return;

        await toastPromise(mutateAsync({name: tagName}), {
            success: "Tag added succesfully",
            loading: "Adding tag...",
            error: "Failed adding tag",
        });

        setTagName("");
    };

    return (
      <div className="w-full h-full flex items-center justify-center">
          <div className="rounded-md bg-white p-4 w-[25rem] border shadow-sm">
              <div className="flex justify-between items-center w-full pb-5">
                  <p className="font-medium text-lg">Add new tag</p>
              </div>
              <div className="flex flex-col gap-3">
                  <div className="flex flex-col">
                      <InputField
                        label="Name"
                        value={tagName}
                        onChange={(e) => setTagName(e.currentTarget.value)}
                        isValid={isTagNameValid}
                        validationInfo="Tag name must be between 3 and 50 characters long"
                      />
                  </div>
                  <DialogButton
                    className="hover:border-green-400"
                    onClick={handleSubmit}
                  >
                      Add Tag
                  </DialogButton>
              </div>
          </div>
      </div>
    );
};

export default AddTag;