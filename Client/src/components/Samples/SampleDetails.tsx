import { SampleDetailsDto } from "@api/terminalSchemas.ts";
import Step from "@components/Recipes/Step";
import Chip from "@components/Shared/Chip";
import Detail from "@components/Shared/Detail";
import { DialogComp } from "@components/Shared/DialogComp";
import StepDetails from "@components/Shared/StepDetails";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";

export interface SampleDetailsProps {
  sample: SampleDetailsDto | undefined;
  open: boolean;
  openChange: (arg0: boolean) => void;
}

/**
 * SampleDetails Component
 *
 * Displays details of a sample including code, creation date, tags, comment, and number of steps.
 * Provides a button to delete the sample.
 *
 * @component
 * @param {SampleDetailsProps} - The properties for the component.
 */
const SampleDetails = ({ sample, open, openChange }: SampleDetailsProps) => {
  const date = new Date(sample?.createdAtUtc ?? "").toDateString();

  return (
    <DialogComp
      isOpen={open}
      setIsOpen={openChange}
      title="Sample details"
      className="w-full lg:w-[700px]"
    >
      <div className="space-y-3 font-light text-sm text-gray-600">
        <div className="grid grid-cols-2 gap-3">
          <Detail value={sample?.code} label="code" />
          <Detail value={sample?.steps?.length ?? 0} label="step count" />
          <Detail value={date} label="creation date" />
          <Detail value={sample?.comment} label="comment" />
        </div>
        <div className="flex flex-col gap-1 items-start w-full justify-center">
          <p className="flex items-center pr-1 text-xs text-gray-500 uppercase">
            tags
          </p>
          <div className="flex gap-1">
            {sample?.tags?.map((tag) => (
              <Chip key={tag.id} value={tag.name ?? ""} className="text-xs" />
            ))}
          </div>
        </div>
        <div className="w-full">
          <p className="flex items-center text-xs text-gray-500 uppercase">
            Steps
          </p>
          <StepDetails steps={sample?.steps ?? []} />
        </div>
      </div>
    </DialogComp>
  );
};

export default SampleDetails;
