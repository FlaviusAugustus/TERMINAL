import { SampleDetailsDto } from "@api/terminalSchemas.ts";
import ChipSet from "@components/Shared/ChipSet";
import Detail from "@components/Shared/Detail";
import { DialogComp } from "@components/Shared/DialogComp";
import StepsTableManagement from "@components/Shared/Table/StepsTableManagement";
import TableCard from "@components/Shared/Table/TableCard";
import TableView from "@components/Shared/Table/TableView";
import { useEditableStepTable } from "@hooks/useEditableStepsTable";
import useParameterColumns from "@hooks/useParameterColumns";

export interface SampleDetailsProps {
  sample: SampleDetailsDto | undefined;
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
  const columns = useParameterColumns();

  const { index, setIndex, table } = useEditableStepTable({
    steps: sample?.steps ?? [],
    columns,
  });

  const date = new Date(sample?.createdAtUtc ?? "").toDateString();

  return (
    <DialogComp
      isOpen={open}
      setIsOpen={openChange}
      title="Sample Details"
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
      </div>
    </DialogComp>
  );
};

export default SampleDetails;
