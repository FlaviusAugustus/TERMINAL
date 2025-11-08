import { ProcessDetailsDto } from "@api/models/Process.ts";
import ChipSet from "@components/shared/common/ChipSet.tsx";
import Detail from "@components/shared/common/Detail.tsx";
import {
  DialogButton,
  DialogComp,
} from "@components/shared/dialog/DialogComp.tsx";
import StepsTableManagement from "@components/shared/table/StepsTableManagement";
import TableCard from "@components/shared/table/TableCard";
import TableView from "@components/shared/table/TableView";
import useUpdateSample from "@hooks/processes/useUpdateSample";
import { useEditableStepTable } from "@hooks/steps/useEditableStepsTable.tsx";
import useEditableForm from "@hooks/steps/useStepsForm.tsx";
import { DialogSubmitButton } from "@components/shared/dialog/DialogSubmitButton.tsx";
import { toastError } from "@utils/toast.utils.tsx";

export interface SampleDetailsProps {
  sample: ProcessDetailsDto | undefined;
  open: boolean;
  openChange: (arg0: boolean) => void;
}

/**
 * EditSample Component
 *
 * Displays details of a sample including code, creation date, tags, comment, and number of steps.
 * Allows for editing parameter values.
 *
 * @component
 * @param {SampleDetailsProps} - The properties for the component.
 */
const EditSample = ({ sample, open, openChange }: SampleDetailsProps) => {
  const {
    data: newSample,
    setData: setNewSample,
    hasChanges: valueChanged,
    resetForm,
  } = useEditableForm<ProcessDetailsDto>(sample);

  const { index, setIndex, table } = useEditableStepTable({
    steps: newSample?.steps ?? [],
    updateData: (rowIndex: number, _: string, value: unknown) => {
      const nsample = structuredClone(newSample) as ProcessDetailsDto;
      nsample.steps![index].parameters![rowIndex].value = value as
        | string
        | number;
      setNewSample(nsample);
    },
  });
  const mutation = useUpdateSample();

  const handleUpdate = async () => {
    if (!newSample) return;

    try {
      await mutation.mutateAsync(newSample);
      openChange(false);
    } catch {
      toastError(`Error while updating sample`);
    }
  };

  return (
    <DialogComp
      isOpen={open}
      setIsOpen={openChange}
      title="Edit Process"
      className="w-full lg:w-[700px]"
      hasDynamicHeight
    >
      <div className="space-y-3 font-light text-sm text-gray-600">
        <div className="grid grid-cols-2 gap-3">
          <Detail label="code">{sample?.code}</Detail>
          <Detail label="step count">{sample?.steps?.length ?? 0}</Detail>
          <Detail label="creation date">
            {new Date(sample?.createdAtUtc ?? "").toDateString()}
          </Detail>
          <Detail label="comment">{sample?.comment}</Detail>
        </div>
        <div className="flex flex-col gap-1 items-start w-full justify-center">
          <Detail label="tags">
            <ChipSet values={sample?.tags?.map((t) => t.name ?? "") ?? []} />
          </Detail>
        </div>
        <div className="w-full">
          {newSample?.steps?.length !== 0 && (
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
        <div className="flex gap-2">
          <DialogSubmitButton
            disabled={!valueChanged}
            className="!w-fit hover:border-green-400"
            onClick={handleUpdate}
            isSubmitting={mutation.isPending}
          >
            Save
          </DialogSubmitButton>
          <DialogButton
            disabled={!valueChanged}
            className="!w-fit hover:border-red-400"
            onClick={resetForm}
          >
            Reset
          </DialogButton>
        </div>
      </div>
    </DialogComp>
  );
};

export default EditSample;
