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
          <Detail label="code">{sample?.code}</Detail>
          <Detail label="step count">{sample?.steps?.length ?? 0}</Detail>
          <Detail label="creation date">{date}</Detail>
          <Detail label="comment">{sample?.comment}</Detail>
        </div>
        <div className="flex flex-col gap-1 items-start w-full justify-center">
          <Detail label="tags">
            <div className="flex gap-1">
              {sample?.tags?.map((tag) => (
                <Chip key={tag.id} value={tag.name ?? ""} className="text-xs" />
              ))}
            </div>
          </Detail>
        </div>
        <div className="w-full">
          <Detail label="steps">
            <StepDetails steps={sample?.steps ?? []} />
          </Detail>
        </div>
      </div>
    </DialogComp>
  );
};

export default SampleDetails;
