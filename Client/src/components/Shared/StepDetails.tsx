import { Step } from "@api/models/Step";
import ParamsTable from "@components/Parameters/ParamsTable";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import clsx from "clsx";

type StepDetailsProps = {
  steps: Step[];
  editable: boolean;
};

const StepDetails = ({ steps, editable }: StepDetailsProps) => {
  return (
    <TabGroup>
      <TabList className="flex gap-1 tabs py-2">
        {steps.map((_step, index) => (
          <Tab
            key={index}
            className={({ selected }) =>
              clsx(
                "p-1 text-sm rounded bg-gray-100 border border-gray-200 flex-1 focus:outline-none",
                selected && "bg-gray-200 border-gray-300"
              )
            }
          >
            Step {index + 1}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {steps.map((step, index) => (
          <TabPanel key={index}>
            <ParamsTable params={step.parameters ?? []} editable={editable} />
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};

export default StepDetails;
