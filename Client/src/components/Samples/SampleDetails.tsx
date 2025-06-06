import { SampleDetailsDto } from "@api/terminalSchemas.ts";
import Chip from "@components/Shared/Chip";
import { DialogComp } from "@components/Shared/DialogComp";
import { ReactNode } from "react";

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
    <DialogComp isOpen={open} setIsOpen={openChange} title="Sample details">
      <div className="space-y-3 font-light text-sm text-gray-600 w-full">
        <div className="flex w-full justify-between">
          <div className="flex flex-col items-start gap-2">
            <Detail value={sample?.code} label="code" />
            <Detail value={date} label="creation date" />
          </div>
          <div className="flex flex-col items-start gap-2">
            <Detail value={sample?.steps?.length} label="step count" />
            <Detail value={sample?.comment} label="comment" />
          </div>
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
      </div>
    </DialogComp>
  );
};

type DetailProps = {
  label: string;
  value: ReactNode | undefined;
};

const Detail = ({ label, value }: DetailProps) => {
  return (
    <div className="flex flex-col gap-1 items-start">
      <p className="flex items-center text-xs text-gray-500 uppercase">
        {label}
      </p>
      <p className="text-base">{value}</p>
    </div>
  );
};

export default SampleDetails;
