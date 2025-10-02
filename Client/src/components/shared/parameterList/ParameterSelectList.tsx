import { ParameterSelect } from "./ParameterSelect.tsx";
import useGetParameters from "@hooks/parameters/useGetParameters.ts";
import { useMemo } from "react";
import { AllParameters } from "@api/models/Parameters.ts";
import { useAddRecipeContext } from "@hooks/recipes/useAddRecipeContext.tsx";

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
  const { recipe, currentStep } = useAddRecipeContext();

  const filterParameters = (
    allParameters: AllParameters[],
    selectedParameters: AllParameters[]
  ): AllParameters[] => {
    return allParameters?.filter(
      (param) => !selectedParameters.some((p) => p.id === param.id)
    );
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
  }, [parameters, currentStep, recipe]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (parameters === undefined) return <div>No parameters found</div>;

  return (
    <div className="flex flex-col flex-grow border border-gray-200 rounded-md bg-gray-100 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 rounded-t-md bg-white">
        <p>Parameters</p>
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
