import FormInput from "@components/shared/form/FormInput.tsx";
import { useState } from "react";
import useAddProject from "@hooks/projects/useAddProject.ts";
import { toastPromise } from "@utils/toast.utils.tsx";
import Form from "@components/shared/form/Form.tsx";
import SubmitButton from "@components/shared/form/SubmitButton.tsx";

/**
 * AddProject Component
 *
 * A form component that allows users to add a new projects.
 *
 * @component
 */
const AddProject = () => {
  const { mutateAsync, isPending } = useAddProject();
  const [projectName, setProjectName] = useState("");

  const handleSubmit = async () => {
    await toastPromise(mutateAsync({ name: projectName }), {
      success: "Project added succesfully",
      loading: "Adding projects...",
      error: "Failed adding projects",
    });

    setProjectName("");
  };

  return (
    <div className="w-full h-full flex items-start justify-center pt-[15vh]">
      <div className="rounded-md bg-white p-4 w-[25rem] border shadow-sm">
        <div className="flex justify-between items-center w-full pb-5">
          <p className="font-medium text-lg">Add new project</p>
        </div>
        <div className="flex flex-col gap-3">
          <Form handleSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <FormInput
                name="name"
                label="Name"
                required
                minLength={3}
                maxLength={50}
                value={projectName}
                onChange={(e) => setProjectName(e.currentTarget.value)}
              />
              <SubmitButton label="Add Project" isLoading={isPending} />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
