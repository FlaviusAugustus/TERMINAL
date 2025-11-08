import { ProcessDetailsDto } from "@api/models/Process.ts";
import ChipSet from "@components/shared/common/ChipSet.tsx";
import Detail from "@components/shared/common/Detail.tsx";
import { DialogComp } from "@components/shared/dialog/DialogComp.tsx";
import StepsTableManagement from "@components/shared/table/StepsTableManagement";
import TableCard from "@components/shared/table/TableCard";
import TableView from "@components/shared/table/TableView";
import { useEditableStepTable } from "@hooks/steps/useEditableStepsTable.tsx";

export interface SampleDetailsProps {
  sample: ProcessDetailsDto | undefined;
  open: boolean;
  openChange: (arg0: boolean) => void;
}

/**
 * SampleDetails Component
 *
 * Displays details of a sample including code, creation date, tags, comment, and number of steps.
 *
 *
 * @component
 * @param {SampleDetailsProps} - The properties for the component.
 */
const SampleDetails = ({ sample, open, openChange }: SampleDetailsProps) => {
  const { index, setIndex, table } = useEditableStepTable({
    steps: sample?.steps ?? [],
  });

  const date = new Date(sample?.createdAtUtc ?? "").toDateString();

  return (
    <DialogComp
      isOpen={open}
      setIsOpen={openChange}
      title="Process Details"
      className="w-full lg:w-[700px]"
      hasDynamicHeight
    >
      <div className="space-y-3 font-light text-sm text-gray-600">
        <div className="grid grid-cols-2 gap-3">
          <Detail label="code">
            {sample?.code?.prefix}
            {sample?.code?.sequentialNumber}
          </Detail>
          <Detail label="step count">{sample?.steps?.length ?? 0}</Detail>
          <Detail label="creation date">{date}</Detail>
          <Detail label="comment">{sample?.comment}</Detail>
        </div>
        <div className="flex flex-col gap-1 items-start w-full justify-center">
          <Detail label="tags">
            <ChipSet values={sample?.tags?.map((t) => t.name ?? "") ?? []} />
          </Detail>
        </div>
        <div className="w-full">
          {sample?.steps?.length !== 0 && (
            <Detail label="steps">
              <div className="flex flex-col gap-2">
                <StepsTableManagement
                  activeIndex={index}
                  activeIndexChange={setIndex}
                  steps={sample?.steps ?? []}
                />
                <TableCard className="!h-full !shadow-none">
                  <TableView table={table} />
                </TableCard>
              </div>
            </Detail>
          )}
        </div>
        <Detail label="Comment">{sample?.steps[index]?.comment}</Detail>
      </div>
    </DialogComp>
  );
};

export default SampleDetails;
