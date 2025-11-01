import { TabGroup, TabPanel, TabPanels } from "@headlessui/react";
import StepTabList from "@components/shared/steps/StepTabList.tsx";
import ParameterDroppable from "@components/shared/parameterList/ParameterDroppable.tsx";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import ParameterBox from "@components/shared/parameterList/ParameterBox.tsx";
import { useAddRecipeContext } from "@hooks/recipes/useAddRecipeContext.tsx";
import HeaderedTextArea from "@components/shared/form/HeaderedTextArea.tsx";
import { useEffect } from "react";
import { useDndContext } from "@dnd-kit/core";

const Steps = () => {
  const { currentStep, setCurrentStep, recipe, updateComment } =
    useAddRecipeContext();

  const { measureDroppableContainers } = useDndContext();

  useEffect(() => {
    measureDroppableContainers(
      recipe.steps[currentStep!].parameters.map((p) => p.id)
    );
  }, [recipe]);

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
          <div className="flex-1 overflow-y-auto sm:pb-20">
            <TabPanels className="h-full rounded-md p-2">
              {recipe.steps.map((step, index) => (
                <TabPanel
                  key={index}
                  className="flex flex-wrap sm:flex-nowrap rounded-md h-full border-0 border-gray-200 w-full p-0 gap-2"
                >
                  <div className="flex flex-col w-full sm:w-3/4 overflow-y-auto gap-1">
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
                  <div className="flex flex-col w-full sm:w-2/5 gap-1">
                    <HeaderedTextArea
                      value={step.comment}
                      setValue={(value) => updateComment(index, value)}
                      label={"Comment"}
                    />
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
