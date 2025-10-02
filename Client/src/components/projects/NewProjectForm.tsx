import InputField from "@components/shared/form/InputField.tsx";
import { useState } from "react";
import { DialogButton } from "@components/shared/dialog/DialogComp.tsx";
import useAddProject from "@hooks/projects/useAddProject";
import { toastPromise } from "utils/toast.utils";
import Form from "@components/shared/form/Form.tsx";

/**
 * NewProjectForm Component
 *
 * A form component that allows users to add a new project.
 *
 * @component
 */
const NewProjectForm = () => {
  const { mutateAsync } = useAddProject();
  const [projectName, setProjectName] = useState("");

  const handleSubmit = async () => {
    await toastPromise(mutateAsync({ name: projectName }), {
      success: "Project added succesfully",
      loading: "Adding project...",
      error: "Failed adding project",
    });

    setProjectName("");
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="rounded-md bg-white p-4 w-[25rem] border shadow-sm">
        <div className="flex justify-between items-center w-full pb-5">
          <p className="font-medium text-lg">Add new project</p>
        </div>
        <div className="flex flex-col gap-3">
          <Form handleSubmit={handleSubmit}>
            <InputField
              name="name"
              label="Name"
              minLength={3}
              maxLength={50}
              value={projectName}
              onChange={(e) => setProjectName(e.currentTarget.value)}
            />
            <DialogButton type="submit" className="hover:border-green-400 mt-2">
              Add Project
            </DialogButton>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default NewProjectForm;
