import { SampleStepDto } from "@api/terminalSchemas";
import Step from "@components/Recipes/Step";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import clsx from "clsx";

type StepDetailsProps = {
  steps: SampleStepDto[];
};

const StepDetails = ({ steps }: StepDetailsProps) => {
  return (
    <TabGroup>
      <TabList className="flex gap-1 tabs py-2">
        {steps.map((_step, index) => (
          <Tab
            key={index}
            className={({ selected }) =>
              clsx(
                "p-1 text-sm rounded bg-gray-100 border border-gray-200 flex-1 focus:outline-none",
                selected && "bg-gray-200 border-gray-300",
              )
            }
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
