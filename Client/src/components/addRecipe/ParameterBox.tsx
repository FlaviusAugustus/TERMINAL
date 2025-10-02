import { AllParameters } from "@api/models/Parameters";
import DragHandle from "@components/shared/DragHandle";
import { defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useAddRecipeContext } from "@hooks/useAddRecipeContext";
import clsx from "clsx";
import {
  LabeledSelect,
  SelectItem,
} from "@components/shared/LabeledSelect.tsx";

type ParameterBoxProps = {
  parameter: AllParameters;
};

/**
 * ParameterBox Component
 *
 * A component that displays a parameter box with options to edit, remove, and reorder parameters.
 * It includes input fields for parameter values and units, and allows drag-and-drop reordering.
 *
 * @component
 */
const ParameterBox = ({ parameter }: ParameterBoxProps) => {
  const { removeParameter, moveParameterUp, moveParameterDown, currentStep } =
    useAddRecipeContext();
  const {
    listeners,
    attributes,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    animateLayoutChanges: (args) =>
      args.isSorting || args.wasDragging
        ? defaultAnimateLayoutChanges(args)
        : true,
    id: parameter.id,
    data: parameter,
  });

  return (
    <div
      id={parameter.id}
      ref={setNodeRef}
      style={{
        transform: transform
          ? `translate3d(0, ${transform.y}px, 0)`
          : undefined,
        transition,
      }}
      className={clsx(
        "rounded-md border border-gray-200 bg-gray-100 shadow-sm",
        isDragging && "z-50"
      )}
    >
      <div className="border-b border-gray-200 rounded-t-md bg-white flex justify-between">
        <p className="p-2 text-sm">{parameter.name}</p>
        <div className="flex gap-2 px-2 items-center justify-center">
          <button onClick={() => moveParameterUp(currentStep, parameter.id)}>
            <ChevronUpIcon className="h-4 w-4" />
          </button>
          <button onClick={() => moveParameterDown(currentStep, parameter.id)}>
            <ChevronDownIcon className="h-4 w-4" />
          </button>
          <button onClick={() => removeParameter(currentStep, parameter.id)}>
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="p-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-start rounded-md border border-gray-200 bg-gray-50">
            <p className="text-xs border-e border-gray-200 p-2 bg-white text-gray-700 rounded-l-md">
              value
            </p>
            <ParameterInput parameter={parameter} />
            <DragHandle attributes={attributes} listeners={listeners} />
          </div>
          {(parameter.$type === "integer" || parameter.$type === "decimal") && (
            <div className="flex items-center justify-start rounded-md border border-gray-200 bg-gray-50">
              <p className="text-xs border-e border-gray-200 p-2 bg-white text-gray-700 rounded-l-md">
                unit
              </p>
              <p className="text-xs px-2 bg-gray-50">{parameter.unit}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

type ParameterInputProps = {
  parameter: AllParameters;
};

const ParameterInput = ({ parameter }: ParameterInputProps) => {
  const { updateParameter, currentStep } = useAddRecipeContext();

  const onChangeValue = (
    parameter: AllParameters,
    newValue: string
  ): AllParameters => {
    if (parameter.$type === "text") {
      return {
        ...parameter,
        value: newValue,
      };
    } else if (parameter.$type === "integer") {
      let parsedValue = 0;
      if (newValue !== "") parsedValue = parseInt(newValue, 10);
      return {
        ...parameter,
        value: parsedValue,
      };
    } else {
      let parsedValue = 0;
      if (newValue !== "") parsedValue = parseFloat(newValue);
      return {
        ...parameter,
        value: parsedValue,
      };
    }
  };

  return (
    <>
      {" "}
      {parameter.$type === "text" ? (
        <div className="rounded-md w-full h-full text-sm ms-2 focus:outline-none bg-gray-50">
          <LabeledSelect
            comboboxStyles={"!py-0 !mt-0"}
            comboboxOptionsStyles={"!py-0 !mt-0"}
            value={parameter.value ?? ""}
            onChange={(val: string) => {
              const updatedParameter = onChangeValue(parameter, val);
              updateParameter(currentStep, updatedParameter);
            }}
          >
            {parameter.allowedValues.map((value: string, index: number) => (
              <SelectItem key={index} value={value} displayValue={value} />
            ))}
          </LabeledSelect>
        </div>
      ) : (
        <input
          className="rounded-md w-full text-sm ms-2 focus:outline-none bg-gray-50"
          type="text"
          value={parameter.value ?? 0}
          onChange={(val) => {
            const updatedParameter = onChangeValue(parameter, val.target.value);
            updateParameter(currentStep, updatedParameter);
          }}
        />
      )}
    </>
  );
};

export default ParameterBox;
