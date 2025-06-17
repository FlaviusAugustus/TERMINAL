import { SampleDetailsDto } from "@api/terminalSchemas.ts";
import Chip from "@components/Shared/Chip";
import Detail from "@components/Shared/Detail";
import { DialogButton, DialogComp } from "@components/Shared/DialogComp";
import StepsTableManagement from "@components/Shared/Table/StepsTableManagement";
import TableCard from "@components/Shared/Table/TableCard";
import TableView from "@components/Shared/Table/TableView";
import { AllParameters } from "@hooks/useGetParameters";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import { clsx } from "clsx";
import { useState } from "react";
import { editableColumn } from "utils/tableUtils";

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
  editable: boolean;
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
const EditSample = ({ sample, open, openChange }: SampleDetailsProps) => {
  const [newSample, setNewSample] = useState<SampleDetailsDto | undefined>(
    structuredClone(sample),
  );
  const [index, setIndex] = useState(0);

  const pageData = newSample?.steps![index].parameters ?? [];
  const date = new Date(sample?.createdAtUtc ?? "").toDateString();

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
      },
    },
    state: {
      pagination: {
        pageIndex: index,
        pageSize: pageData.length,
      },
    },
  });

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
            <div className="flex gap-1">
              {sample?.tags?.map((tag) => (
                <Chip key={tag.id} value={tag.name ?? ""} className="text-xs" />
              ))}
            </div>
          </Detail>
        </div>
        <div className="w-full">
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
        </div>
        <div className="flex gap-2">
          <DialogButton
            className="!w-fit hover:border-green-400"
            onClick={() => {}}
          >
            Save
          </DialogButton>
          <DialogButton
            className="!w-fit hover:border-red-400"
            onClick={() => setNewSample(sample)}
          >
            Reset
          </DialogButton>
        </div>
      </div>
    </DialogComp>
  );
};

export default EditSample;
