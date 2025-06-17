import {DialogComp} from "@components/Shared/DialogComp.tsx";
import Detail from "@components/Shared/Detail.tsx";
import {AllParameterDetails, ParameterNumericDetails, ParameterTextDetails} from "@api/models/ParameterDetails.ts";
import Chip from "@components/Shared/Chip.tsx";
import {Color} from "../../utils/colorUtils.tsx";

export interface ParameterDetailsProps {
    parameter: AllParameterDetails | undefined;
    open: boolean;
    openChange: (arg0: boolean) => void;
}

function getChipColorForAllowedValues(): Color {
    return "fuchsia";
}

function getChipColors(isActive: boolean): Color {
    return isActive ? "green" : "red";
}

function getChipValue(isActive: boolean): string {
    return isActive ? "Active" : "Not Active";
}

function getParameterText(parameter: AllParameterDetails | null): ParameterTextDetails | null {
    if(parameter && 'allowedValues' in parameter) return parameter as ParameterTextDetails;
    return null
}

function getParameterNumeric(parameter: AllParameterDetails | null): ParameterNumericDetails | null {
    if (parameter && 'unit' in parameter) return parameter as ParameterNumericDetails;
    return null;
}

const ParameterDetails = ({ parameter, open, openChange }: ParameterDetailsProps) => {

    const parameterTextDetails = getParameterText(parameter || null);
    const parameterNumericDetails = getParameterNumeric(parameter || null) ;

    return (
        <DialogComp
            isOpen={open}
            setIsOpen={openChange}
            title="Parameter details"
            className="w-full lg:w-[700px]"
        >
            <div className="space-y-3 font-light text-sm text-gray-600">
                <div className="grid grid-cols-2 gap-3">
                    <Detail label="name">{parameter?.name.value}</Detail>
                    <Detail label="isActive">
                        <Chip
                            getColorValue={() => getChipColors(parameter?.isActive || false)}
                            value={getChipValue(parameter?.isActive || false)}/>
                    </Detail>
                    { parameterNumericDetails && (
                        <>
                            <Detail label="step">{parameterNumericDetails?.step}</Detail>
                            <Detail label="unit">{parameterNumericDetails?.unit}</Detail>
                        </>
                    )}
                </div>
                {parameterTextDetails &&
                    <div className="flex flex-col gap-1 items-start w-full justify-center">
                            <Detail label="Allowed values:">
                            <div className="flex gap-1">
                                {parameterTextDetails?.allowedValues?.map((value, index) => (
                                    <Chip getColorValue={getChipColorForAllowedValues} key={index} value={value ?? ""}
                                          className="text-xs"/>
                                ))}
                            </div>
                        </Detail>
                    </div>
                }
            </div>
        </DialogComp>
    );
};

export default ParameterDetails;