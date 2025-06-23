import { AllParameters } from "@api/models/Parameters";
import { RecipeDetailsDto } from "@api/models/Recipe";
import { Step } from "@api/models/Step";
import { arraySwap } from "@dnd-kit/sortable";
import { createContext, ReactNode, useContext, useState } from "react";

type AddRecipeContextValue = {
  recipe: RecipeDetailsDto;
  currentStep: number | null;
  setCurrentStep: (step: number | null) => void;
  addStep: () => void;
  removeStep: (index: number) => void;
  updateStep: (index: number, updatedStep: Step) => void;
  updateRecipe: (updatedRecipe: RecipeDetailsDto) => void;
  getCurrentStep: () => Step | null;
  findParameterIndex: (id: string | null) => number;
  removeParameter: (stepIndex: number | null, parameterId: string) => void;
  updateParameter: (stepIndex: number | null, parameter: AllParameters) => void;
  moveParameterUp: (
    stepIndex: number | null,
    parameterId: string | null,
  ) => void;
  moveParameterDown: (
    stepIndex: number | null,
    parameterId: string | null,
  ) => void;
  copyStepAsNext: (index: number) => void;
};

const AddRecipeContext = createContext<AddRecipeContextValue | null>(null);

/**
 * useAddRecipeContext Hook
 *
 * A custom hook that provides access to the AddRecipeContext.
 *
 * @hook
 */
function useAddRecipeContext(): AddRecipeContextValue {
  const context = useContext(AddRecipeContext);
  if (!context) {
    throw new Error(
      "useAddRecipeContext must be used within a AddRecipeProvider",
    );
  }
  return context;
}

/**
 * AddRecipeProvider Hook
 *
 * Provides context for managing the recipe creation process, including steps and parameters.
 * It allows adding, removing, and updating steps and parameters within a recipe.
 *
 * @hook
 */
const AddRecipeProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [recipe, setRecipe] = useState<RecipeDetailsDto>({
    id: "",
    name: "",
    steps: [],
  });

  const addStep = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      steps: [...prevRecipe.steps, { id: "", comment: "", parameters: [] }],
    }));
    if (currentStep === null) {
      setCurrentStep(0);
    }
  };

  const removeStep = (index: number) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      steps: prevRecipe.steps.filter((_, i) => i !== index),
    }));
  };

  const updateStep = (index: number, updatedStep: Step) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      steps: prevRecipe.steps.map((step, i) =>
        i === index ? updatedStep : step,
      ),
    }));
  };

  const updateRecipe = (updatedRecipe: RecipeDetailsDto) => {
    setRecipe(updatedRecipe);
  };

  const findParameterIndex = (id: string | null) => {
    if (currentStep === null) return -1;

    return recipe.steps[currentStep].parameters.findIndex((x) => x.id === id);
  };

  const removeParameter = (stepIndex: number | null, parameterId: string) => {
    if (stepIndex === null) return;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      steps: prevRecipe.steps.map((step, i) =>
        i === stepIndex
          ? {
              ...step,
              parameters: step.parameters.filter(
                (param) => param.id !== parameterId,
              ),
            }
          : step,
      ),
    }));
  };

  const updateParameter = (
    stepIndex: number | null,
    parameter: AllParameters,
  ) => {
    if (stepIndex === null) return;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      steps: prevRecipe.steps.map((step, i) =>
        i === stepIndex
          ? {
              ...step,
              parameters: step.parameters.map((param) =>
                param.id === parameter.id ? parameter : param,
              ),
            }
          : step,
      ),
    }));
  };

  const moveParameterUp = (
    stepIndex: number | null,
    parameterId: string | null,
  ) => {
    if (stepIndex === null || currentStep === null) return;

    const parameterIndex = findParameterIndex(parameterId);
    if (parameterIndex === -1 || parameterIndex === 0) return;

    const newStep = { ...recipe.steps[currentStep] };
    newStep.parameters = arraySwap(
      newStep.parameters,
      parameterIndex,
      parameterIndex - 1,
    );

    updateStep(currentStep, newStep);
  };

  const moveParameterDown = (
    stepIndex: number | null,
    parameterId: string | null,
  ) => {
    if (stepIndex === null || currentStep === null) return;
    const newStep = { ...recipe.steps[currentStep] };

    const parameterIndex = findParameterIndex(parameterId);
    if (
      parameterIndex === -1 ||
      parameterIndex === newStep.parameters.length - 1
    )
      return;

    newStep.parameters = arraySwap(
      newStep.parameters,
      parameterIndex,
      parameterIndex + 1,
    );

    updateStep(currentStep, newStep);
  };

  const copyStepAsNext = (index: number) => {
    if (index === null || currentStep === null) {
      return;
    }

    const newStep = { ...recipe.steps[currentStep] };
    newStep.parameters = newStep.parameters.map((param) => ({
      ...param,
    }));

    const newRecipe = {
      ...recipe,
      steps: recipe.steps.toSpliced(index + 1, 0, newStep),
    };

    updateRecipe(newRecipe);
  };

  const getCurrentStep = () => {
    if (currentStep === null) return null;

    return recipe.steps[currentStep];
  };

  return (
    <AddRecipeContext.Provider
      value={{
        recipe,
        currentStep,
        setCurrentStep,
        addStep,
        removeStep,
        updateStep,
        updateRecipe,
        findParameterIndex,
        getCurrentStep,
        removeParameter,
        updateParameter,
        moveParameterUp,
        moveParameterDown,
        copyStepAsNext,
      }}
    >
      {children}
    </AddRecipeContext.Provider>
  );
};
export { AddRecipeProvider, useAddRecipeContext };
