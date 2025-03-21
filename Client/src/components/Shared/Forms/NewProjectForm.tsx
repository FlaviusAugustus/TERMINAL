import InputField from "./InputField";
import React, { useState } from "react";
import { Button } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

/**
 * NewProjectForm Component
 *
 * A form component that allows users to add a new project.
 *
 * @component
 */
const NewProjectForm = () => {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [isProjectNameValid, setIsProjectNameValid] = useState(true);

  const checkIfNameIsValid = (name: string) => {
    return name.length >= 3 && name.length <= 50;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const projectNameValid = checkIfNameIsValid(projectName);
    setIsProjectNameValid(projectNameValid);

    if (!projectNameValid) {
      console.log("Invalid project name: ", projectName);
      return;
    } else {
      console.log("New project submitted: ", projectName);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-semibold text-left mb-4">Add a new project</h1>
            <p className="text-sm mb-3">Project name must be between 3 and 50 characters long</p>
            <InputField
                name="projectName"
                type="text"
                label="project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                isValid={isProjectNameValid}
            />
            <div className="flex space-x-2 mt-4">
              <Button type="submit" className="rounded-xl bg-green-500 hover:bg-green-600 text-white px-4 py-2">
                Add project
              </Button>
              <Button type="button" className="rounded-xl bg-red-500 hover:bg-red-600 text-white px-4 py-2" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default NewProjectForm;