import { useEffect, useState } from "react";
import {
  DialogButton,
  DialogComp,
} from "@components/shared/dialog/DialogComp.tsx";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import LabeledSwitch from "@components/shared/form/LabeledSwitch.tsx";
import { DialogSubmitButton } from "@components/shared/dialog/DialogSubmitButton.tsx";
import Detail from "@components/shared/common/Detail.tsx";
import Chip from "@components/shared/common/Chip.tsx";
import { AllParameters } from "@api/models/Parameters.ts";
import { Color } from "@utils/colorUtils.tsx";

export interface ParameterEditProps {
  parameter: AllParameters | undefined;
  onSubmit: (id: string, isActive: boolean) => void;
  open: boolean;
  setOpen: (arg0: boolean) => void;
  isSubmitting: boolean;
}

function getChipColorForAllowedValues(): Color {
  return "fuchsia";
}

/**
 * ParameterEdit Component
 *
 * Displays details of a parameters including name, processes and activity.
 * Provides functionality to reset changes, submit changes, change activity.
 *
 * @component
 */
const ParameterEdit = ({
  parameter,
  onSubmit,
  open,
  setOpen,
  isSubmitting,
}: ParameterEditProps) => {
  const [isChanged, setIsChanged] = useState(false);
  const [isActive, setActive] = useState(parameter?.isActive);

  useEffect(() => {
    setActive(parameter?.isActive || false);
    setIsChanged(false);
  }, [parameter]);

  const handleReset = () => {
    setActive(parameter?.isActive || false);
    setIsChanged(false);
  };

  return (
    <DialogComp
      isOpen={open}
      setIsOpen={setOpen}
      title="Parameter details"
      className="w-full lg:w-[700px]"
    >
      <div className="space-y-3 font-light text-sm text-gray-600">
        <div className="grid grid-cols-3 gap-3">
          <Detail label="name">{parameter?.name}</Detail>
          {(parameter?.$type === "decimal" ||
            parameter?.$type === "integer") && (
            <>
              <Detail label="step">{parameter?.step}</Detail>
              <Detail label="unit">{parameter?.unit}</Detail>
            </>
          )}
        </div>
        {parameter?.$type === "text" && (
          <div className="flex flex-col gap-1 items-start w-full justify-center">
            <Detail label="Allowed values:">
              <div className="flex gap-1">
                {parameter?.allowedValues?.map((value, index) => (
                  <Chip
                    getColorValue={getChipColorForAllowedValues}
                    key={index}
                    value={value ?? ""}
                    className="text-xs"
                  />
                ))}
              </div>
            </Detail>
          </div>
        )}
        <LabeledSwitch
          label="Status"
          id="status"
          checked={isActive}
          onChange={() => {
            setActive(!isActive);
            setIsChanged(true);
          }}
        />
      </div>
      <div className="flex gap-1 mt-4">
        <DialogSubmitButton
          disabled={!isChanged}
          className="hover:border-blue-400 "
          onClick={() =>
            parameter && isActive != null && onSubmit(parameter?.id, isActive)
          }
          isSubmitting={isSubmitting}
        >
          Submit changes
        </DialogSubmitButton>
        <DialogButton
          disabled={!isChanged}
          className="!w-fit hover:border-blue-400"
          onClick={handleReset}
        >
          <ArrowPathIcon className="h-4 w-4" />
        </DialogButton>
      </div>
    </DialogComp>
  );
};

export default ParameterEdit;
