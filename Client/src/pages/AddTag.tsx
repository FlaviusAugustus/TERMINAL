import FormInput from "@components/shared/form/FormInput.tsx";
import { useState } from "react";
import { toastPromise } from "@utils/toast.utils.tsx";
import useAddTag from "@hooks/tags/useAddTag.ts";
import Form from "@components/shared/form/Form.tsx";
import SubmitButton from "@components/shared/form/SubmitButton.tsx";

const AddTag = () => {
  const { mutateAsync, isPending } = useAddTag();
  const [tagName, setTagName] = useState("");

  const handleSubmit = async () => {
    await toastPromise(mutateAsync({ name: tagName }), {
      success: "Tag added succesfully",
      loading: "Adding tag...",
      error: "Failed adding tag",
    });

    setTagName("");
  };

  return (
    <div className="w-full h-full flex items-start justify-center pt-[15vh]">
      <div className="rounded-md bg-white p-4 w-[25rem] border shadow-sm">
        <div className="flex justify-between items-center w-full pb-5">
          <p className="font-medium text-lg">Add new tag</p>
        </div>
        <Form handleSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <FormInput
              label="Name"
              name="name"
              required
              value={tagName}
              minLength={3}
              maxLength={50}
              onChange={(e) => setTagName(e.currentTarget.value)}
            />
            <SubmitButton label="Add Tag" isLoading={isPending} />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddTag;
