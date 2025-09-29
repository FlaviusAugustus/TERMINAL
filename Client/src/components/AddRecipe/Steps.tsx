import { TabGroup, TabPanel, TabPanels } from "@headlessui/react";
import StepTabList from "@components/AddRecipe/StepTabList.tsx";
import ParameterDroppable from "@components/AddRecipe/ParameterDroppable.tsx";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import ParameterBox from "@components/AddRecipe/ParameterBox.tsx";
import { useAddRecipeContext } from "@hooks/useAddRecipeContext.tsx";

const Steps = () => {
  const { currentStep, setCurrentStep, recipe } = useAddRecipeContext();

  return (
    <>
      <div className="p-4 border-b border-gray-200 rounded-t-md">
        <p>Steps</p>
      </div>
      <div className="bg-gray-100 h-full">
        <TabGroup
          className="flex flex-col h-full overflow-x-auto"
          selectedIndex={currentStep == null ? undefined : currentStep}
          onChange={setCurrentStep}
        >
          <StepTabList />
          <div className="flex-1 overflow-y-auto pb-20">
            <TabPanels className="h-full rounded-md p-2">
              {recipe.steps.map((step, index) => (
                <TabPanel
                  key={index}
                  className="rounded-md h-full  border-0 border-gray-200  w-full p-0 grid grid-cols-10 gap-2"
                >
                  <div className="flex flex-col gap-1 w-full col-span-6 overflow-y-auto">
                    <ParameterDroppable>
                      <SortableContext
                        items={step.parameters}
                        strategy={horizontalListSortingStrategy}
                      >
                        {step.parameters.map((parameter) => (
                          <ParameterBox
                            key={parameter.id}
                            parameter={parameter}
                          />
                        ))}
                      </SortableContext>
                    </ParameterDroppable>
                  </div>
                  <div className="flex flex-col gap-1 w-full col-span-4">
                    <div className="rounded-md border border-gray-200 shadow-sm">
                      <div className="border-b border-gray-200 rounded-t-md bg-white">
                        <p className="p-2 text-sm">Comment</p>
                      </div>
                      <div className="p-2 bg-gray-50">
                        <textarea
                          className="h-auto w-full focus:outline-none bg-gray-50"
                          rows={20}
                        />
                      </div>
                    </div>
                  </div>
                </TabPanel>
              ))}
            </TabPanels>
          </div>
        </TabGroup>
      </div>
    </>
  );
};

export default Steps;
