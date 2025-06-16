import { SampleStepDto } from "@api/terminalSchemas";
import Step from "@components/Recipes/Step";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

type StepDetailsProps = {
  steps: SampleStepDto[];
};

const StepDetails = ({ steps }: StepDetailsProps) => {
  return (
    <TabGroup>
      <TabList className="flex tabs py-2">
        {steps.map((_step, index) => (
          <Tab
            key={index}
            className="p-1 text-sm rounded bg-gray-100 border data-selected:bg-gray-200 border-gray-200 flex-1 focus:outline-none"
          >
            Step {index + 1}
          </Tab>
        ))}
      </TabList>
      <TabPanels className="border rounded-md">
        {steps.map((step, index) => (
          <TabPanel key={index}>
            <Step step={step} />
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};

export default StepDetails;
