import { SampleDetailsDto } from "@api/terminalSchemas.ts";
import ChipSet from "@components/Shared/ChipSet";
import Detail from "@components/Shared/Detail";
import { DialogButton, DialogComp } from "@components/Shared/DialogComp";
import StepsTableManagement from "@components/Shared/Table/StepsTableManagement";
import TableCard from "@components/Shared/Table/TableCard";
import TableView from "@components/Shared/Table/TableView";
import useUpdateSample from "@hooks/samples/useUpdateSample";
import { AllParameters } from "@hooks/useGetParameters";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { sampleToUpdateRequest } from "utils/mapUtils";
import { editableColumn } from "utils/tableUtils";
import { toastPromise } from "utils/toast.utils";

const columns: ColumnDef<AllParameters>[] = [
  {
    id: "name",
    accessorFn: (param) => param.name,
  },
  {
    id: "value",
    accessorFn: (param) => param.value,
    ...editableColumn,
  },
  {
    id: "unit",
    accessorFn: (param) => (param.$type !== "text" ? param.unit : "-"),
  },
];

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
  const [valueChanged, setValueChanged] = useState(false);
  const [reset, setResetValue] = useState(structuredClone(sample));
  const [newSample, setNewSample] = useState<SampleDetailsDto | undefined>(
    sample,
  );

  useEffect(() => {
    setResetValue(structuredClone(sample));
    setNewSample(sample);
    setValueChanged(false);
  }, [sample]);

  const [index, setIndex] = useState(0);

  const pageData = useMemo(() => {
    if (!newSample?.steps || newSample.steps.length === 0) return [];
    return newSample?.steps[index].parameters ?? [];
  }, [newSample, index, sample]);

  const date = new Date(sample?.createdAtUtc ?? "").toDateString();

  const mutation = useUpdateSample();

  const table = useReactTable({
    columns: columns,
    defaultColumn: undefined,
    data: pageData,
    getCoreRowModel: getCoreRowModel(),
    enableMultiRowSelection: true,
    meta: {
      updateData: (rowIndex: number, _: string, value: unknown) => {
        const nsample = structuredClone(newSample) as SampleDetailsDto;
        nsample.steps![index].parameters![rowIndex].value = value as
          | string
          | number;
        setNewSample(nsample);
        setValueChanged(true);
      },
    },
    state: {
      pagination: {
        pageIndex: index,
        pageSize: pageData.length,
      },
    },
  });

  const handleUpdate = async () => {
    if (!newSample) return;
    console.log(newSample);

    await toastPromise(mutation.mutateAsync(sampleToUpdateRequest(newSample)), {
      success: "Success updating sample",
      loading: "Updating sample...",
      error: "Error updating sample",
    });

    if (mutation.isSuccess) openChange(false);
  };

  const handleReset = () => {
    setNewSample(structuredClone(reset));
    setValueChanged(false);
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
          <Detail label="creation date">{date}</Detail>
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
            onClick={handleReset}
          >
            Reset
          </DialogButton>
        </div>
      </div>
    </DialogComp>
  );
};

export default EditSample;
