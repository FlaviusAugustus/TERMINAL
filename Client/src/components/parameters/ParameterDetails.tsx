import { DialogComp } from "@components/shared/dialog/DialogComp.tsx";
import Detail from "@components/shared/common/Detail.tsx";
import Chip from "@components/shared/common/Chip.tsx";
import { Color } from "@utils/colorUtils.tsx";
import { AllParameters } from "@api/models/Parameters.ts";

export interface ParameterDetailsProps {
  parameter: AllParameters | undefined;
  open: boolean;
  openChange: (arg0: boolean) => void;
}

function getChipColorForAllowedValues(): Color {
  return "fuchsia";
}

const ParameterDetails = ({
  parameter,
  open,
  openChange,
}: ParameterDetailsProps) => {
  return (
    <DialogComp
      isOpen={open}
      setIsOpen={openChange}
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
      </div>
    </DialogComp>
  );
};

export default ParameterDetails;
