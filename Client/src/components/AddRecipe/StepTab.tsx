import { Tab } from "@headlessui/react";
import { DocumentDuplicateIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAddRecipeContext } from "@hooks/useAddRecipeContext";

type StepTabProps = {
  index: number;
};

/**
 * StepTab Component
 *
 * A component that represents a tab for a step in a recipe.
 * It allows users to copy the step as the next step or remove the step.
 *
 * @component
 */
const StepTab = ({ index }: StepTabProps) => {
  const { copyStepAsNext, removeStep } = useAddRecipeContext();
  return (
    <Tab
      as="div"
      key={index}
      className="w-full p-2 rounded border border-gray-200 bg-white relative group data-[selected]:bg-gray-50 focus:outline-none"
    >
      <p className="text-sm whitespace-nowrap text-center">Step {index + 1}</p>
      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        <div className="flex items-center justify-center">
          <button
            onClick={() => copyStepAsNext(index)}
            className="group-hover:block rounded p-px hidden hover:bg-gray-100 bg-white"
          >
            <DocumentDuplicateIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => removeStep(index)}
            className="group-hover:block rounded p-px hidden hover:bg-gray-100 bg-white"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Tab>
  );
};

export default StepTab;
