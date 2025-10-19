import { TabList } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useAddRecipeContext } from "@hooks/recipes/useAddRecipeContext.tsx";
import StepTab from "./StepTab.tsx";

/**
 * StepTabList Component
 *
 * A component that displays a list of tabs for each step in a recipe.
 * It allows users to add new steps and navigate between existing steps.
 *
 * @component
 */
const StepTabList = () => {
  const { addStep, recipe, setCurrentStep } = useAddRecipeContext();
  return (
    <TabList className="flex gap-1 w-full p-2 overflow-x-auto hover:cursor-pointer">
      <div className="overflow-x-auto flex gap-1 w-full">
        {recipe.steps.map((_, index) => (
          <StepTab key={index} index={index} />
        ))}
      </div>
      <button
        onClick={() => {
          addStep();
          setCurrentStep(recipe.steps.length);
        }}
        className="p-2 rounded border border-gray-200 bg-white flex items-center justify-center aspect-square hover:bg-gray-100"
      >
        <PlusIcon className="h-5 aspect-square" />
      </button>
    </TabList>
  );
};

export default StepTabList;
