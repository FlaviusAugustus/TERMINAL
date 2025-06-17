import { TabGroup, TabPanel, TabPanels } from "@headlessui/react";
import useGetParameters from "@hooks/parameters/useGetParameters.ts";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { RecipeDragProvider } from "@hooks/useRecipeDragContext";
import {
  AddRecipeProvider,
  useAddRecipeContext,
} from "@hooks/useAddRecipeContext";
import AddRecipeActions from "@components/AddRecipe/AddRecipeActions";
import ParameterBox from "@components/AddRecipe/ParameterBox";
import ParameterSelectList from "@components/AddRecipe/ParameterSelectList";
import ParameterDroppable from "@components/AddRecipe/ParameterDroppable";
import StepTabList from "@components/AddRecipe/StepTabList";

const AddRecipeWithContexts = () => {
  const { data: parameters, isLoading, isError } = useGetParameters();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (parameters === undefined) return <div>No parameters found</div>;

  return (
    <AddRecipeProvider>
      <RecipeDragProvider parameters={parameters.parameters}>
        <AddRecipe />
      </RecipeDragProvider>
    </AddRecipeProvider>
  );
};

const AddRecipe = () => {
  const { data: parameters, isLoading, isError } = useGetParameters();
  const { currentStep, setCurrentStep, recipe } = useAddRecipeContext();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (parameters === undefined) return <div>No parameters found</div>;

  return (
    <div className="p-2 flex gap-2 h-full">
      <div className="flex flex-col gap-2 w-80">
        <ParameterSelectList parameters={parameters.parameters} />
        <AddRecipeActions />
      </div>
      <div className="flex flex-col border border-gray-200 rounded-md bg-white w-full overflow-hidden">
        <div className="p-4 border-b border-gray-200 rounded-t-md">
          <p>Recipe</p>
        </div>
        <div className="bg-gray-100 h-full">
          <TabGroup
            className="flex flex-col h-full overflow-y-hidden overflow-x-auto"
            selectedIndex={currentStep == null ? undefined : currentStep}
            onChange={setCurrentStep}
          >
            <StepTabList />
            <div className="h-full relative">
              <TabPanels className="h-full overflow-hidden rounded-md p-2">
                {recipe.steps.map((step, index) => (
                  <TabPanel
                    key={index}
                    className="rounded-md h-full bg-white border border-gray-200 shadow-sm w-full p-2 grid grid-cols-10 gap-2"
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
                        <div className="border-b border-gray-200 rounded-t-md bg-gray-100">
                          <p className="p-2 text-sm">Comment</p>
                        </div>
                        <div className="p-2">
                          <textarea className="h-auto w-full" rows={20} />
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                ))}
              </TabPanels>
            </div>
          </TabGroup>
        </div>
      </div>
    </div>
  );
};

export default AddRecipeWithContexts;
