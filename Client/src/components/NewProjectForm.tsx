import InputField from "./Login/InputField";
import React, { useState, useCallback } from "react";

const NewProjectForm = () => {

    const [projectName, setProjectName] = useState("");

    const checkIfNameIsValid = (name: string) => {
        return name.length >= 3 && name.length <= 50;
    }

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setProjectName(value);
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (checkIfNameIsValid(projectName)) {
            console.log("form submitted");
        }
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
                        label="New project name"
                        value={projectName}
                        description="project name"
                        onChange={handleChange}
                        isValid={checkIfNameIsValid(projectName)}
                    />
                    <div className="flex space-x-2 mt-4">
                        <button className="btn btn-outline btn-error rounded-lg">Close</button>
                        <button className="btn btn-outline btn-success rounded-lg">Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewProjectForm;