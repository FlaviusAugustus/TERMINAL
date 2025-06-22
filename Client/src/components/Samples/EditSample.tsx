import { SampleDetailsDto } from "@api/terminalSchemas.ts";
import ChipSet from "@components/Shared/ChipSet";
import Detail from "@components/Shared/Detail";
import { DialogButton, DialogComp } from "@components/Shared/DialogComp";
import StepsTableManagement from "@components/Shared/Table/StepsTableManagement";
import TableCard from "@components/Shared/Table/TableCard";
import TableView from "@components/Shared/Table/TableView";
import useUpdateSample from "@hooks/samples/useUpdateSample";
import { useEditableStepTable } from "@hooks/useEditableStepsTable";
import useParameterColumns from "@hooks/useParameterColumns";
import useEditableForm from "@hooks/useStepsForm";
import { toastPromise } from "utils/toast.utils";

export interface SampleDetailsProps {
  sample: SampleDetailsDto | undefined;
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
  const columns = useParameterColumns(true);
  const {
    data: newSample,
    setData: setNewSample,
    hasChanges: valueChanged,
    resetForm,
  } = useEditableForm<SampleDetailsDto>(sample);

  const { index, setIndex, table } = useEditableStepTable({
    steps: newSample?.steps ?? [],
    columns,
    updateData: (rowIndex: number, _: string, value: unknown) => {
      const nsample = structuredClone(newSample) as SampleDetailsDto;
      nsample.steps![index].parameters![rowIndex].value = value as
        | string
        | number;
      setNewSample(nsample);
    },
  });
  const mutation = useUpdateSample();

  const handleUpdate = async () => {
    if (!newSample) return;

    await toastPromise(mutation.mutateAsync(newSample), {
      success: "Success updating sample",
      loading: "Updating sample...",
      error: "Error updating sample",
    });
  };

  return (
    <DialogComp
      isOpen={open}
      setIsOpen={openChange}
      title="Edit Sample"
      className="w-full lg:w-[700px]"
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
          <DialogButton
            disabled={!valueChanged}
            className="!w-fit hover:border-green-400"
            onClick={handleUpdate}
          >
            Save
          </DialogButton>
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
