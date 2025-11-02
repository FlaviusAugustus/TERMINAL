import { ParameterSelect } from "./ParameterSelect.tsx";
import useGetParameters from "@hooks/parameters/useGetParameters.ts";
import { useMemo, useState } from "react";
import { AllParameters } from "@api/models/Parameters.ts";
import { useAddRecipeContext } from "@hooks/recipes/useAddRecipeContext.tsx";
import FormInput from "../form/FormInput.tsx";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

/**
 * ParameterSelectList Component
 *
 * A component that displays a list of selectable parameters.
 * It allows users to select parameters for a recipe, with each parameter displayed as a selectable item.
 *
 * @component
 */
const ParameterSelectList = () => {
  const { data: parameters, isLoading, isError } = useGetParameters();
  const { recipe, currentStep, updateRecipe } = useAddRecipeContext();
  const [searchTerm, setSearchTerm] = useState("");

  const filterParameters = (
    allParameters: AllParameters[],
    selectedParameters: AllParameters[]
  ): AllParameters[] => {
    return allParameters
      ?.filter((param) => !selectedParameters.some((p) => p.id === param.id))
      .filter((param) =>
        searchTerm !== "" ? param.name.includes(searchTerm) : true
      );
  };

  const addFirstMatchingParam = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      event.key !== "Enter" ||
      searchTerm === "" ||
      availableParameters?.length == 0 ||
      recipe == null ||
      currentStep == null
    )
      return;

    const newRecipe = { ...recipe };
    const stepParameters = recipe.steps[currentStep].parameters;

    newRecipe.steps[currentStep].parameters = [
      ...stepParameters,
      availableParameters![0],
    ];

    updateRecipe(newRecipe);
    setSearchTerm("");
  };

  const availableParameters: AllParameters[] | undefined = useMemo(() => {
    if (parameters?.parameters == undefined) return [];
    if (
      currentStep == null ||
      recipe == null ||
      recipe.steps.length <= currentStep
    ) {
      return parameters?.parameters;
    }
    return filterParameters(
      parameters?.parameters,
      recipe.steps[currentStep].parameters
    );
  }, [parameters, currentStep, recipe, searchTerm]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (parameters === undefined) return <div>No parameters found</div>;

  return (
    <div className="flex flex-col flex-grow border border-gray-200 rounded-md bg-gray-100 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 rounded-t-md bg-white">
        <p>Parameters</p>
      </div>
      <div className="p-2">
        <FormInput
          icon={<MagnifyingGlassIcon className="h-4 w-5" />}
          validate={false}
          value={searchTerm}
          onKeyDown={addFirstMatchingParam}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 py-2 overflow-auto border-0">
        {availableParameters?.map((parameter) => (
          <ParameterSelect key={parameter.id} parameter={parameter} />
        ))}
      </div>
    </div>
  );
};

export default ParameterSelectList;
