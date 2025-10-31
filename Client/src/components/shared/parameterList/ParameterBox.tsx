import { AllParameters } from "@api/models/Parameters.ts";
import DragHandle from "@components/shared/parameterList/DragHandle.tsx";
import { defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useAddRecipeContext } from "@hooks/recipes/useAddRecipeContext.tsx";
import clsx from "clsx";
import {
  LabeledSelect,
  SelectItem,
} from "@components/shared/form/LabeledSelect.tsx";
import FormInput from "@components/shared/form/FormInput.tsx";
import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

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
      <ParameterHeader
        parameter={parameter}
        attributes={attributes}
        listeners={listeners}
      />
      <div className="p-2">
        <ParameterInput parameter={parameter} />
      </div>
    </div>
  );
};

type ParameterHeaderProps = {
  parameter: AllParameters;
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap | undefined;
};

const ParameterHeader = ({
  parameter,
  attributes,
  listeners,
}: ParameterHeaderProps) => {
  const { currentStep, moveParameterDown, moveParameterUp, removeParameter } =
    useAddRecipeContext();

  return (
    <div className="border-b border-gray-200 rounded-t-md bg-white flex justify-between">
      <p className="p-2 text-sm">{parameter.name}</p>
      <div className="flex gap-2 px-2 items-center justify-center">
        <DragHandle attributes={attributes} listeners={listeners} />
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
    const newParameter = { ...parameter };
    if (parameter.$type == "text") newParameter.value = newValue;
    if (parameter.$type == "integer") newParameter.value = parseInt(newValue);
    if (parameter.$type == "decimal") newParameter.value = parseFloat(newValue);

    return newParameter;
  };

  return (
    <>
      {parameter.$type === "text" ? (
        <LabeledSelect
          value={parameter.value}
          onChange={(val: string) => {
            const updatedParameter = onChangeValue(parameter, val);
            updateParameter(currentStep, updatedParameter);
          }}
        >
          {parameter.allowedValues.map((value: string, index: number) => (
            <SelectItem key={index} value={value} displayValue={value} />
          ))}
        </LabeledSelect>
      ) : (
        <FormInput
          name="Step"
          type="number"
          unit={parameter.unit}
          validate={false}
          step={parameter.step}
          value={parameter.value}
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
