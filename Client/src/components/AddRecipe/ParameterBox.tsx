import { AllParameters } from "@api/models/Parameters";
import DragHandle from "@components/Shared/DragHandle";
import { defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useAddRecipeContext } from "@hooks/useAddRecipeContext";
import clsx from "clsx";

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
    removeParameter,
    moveParameterUp,
    moveParameterDown,
    currentStep,
    updateParameter,
  } = useAddRecipeContext();
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
        "rounded-md border border-gray-200 bg-white shadow-sm !tanslate-x-0",
        isDragging && "z-50"
      )}
    >
      <div className="border-b border-gray-200 rounded-t-md bg-gray-100 flex justify-between">
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
          <div className="flex items-center justify-start rounded-md border border-gray-200">
            <p className="text-xs border-e border-gray-200 p-2 bg-gray-100 text-gray-700">
              default
            </p>
            <input
              className="rounded-md w-full text-sm ms-2 focus:outline-none"
              type="text"
              value={parameter.value ?? (parameter.$type === "text" ? "" : 0)}
              onChange={(val) => {
                const newParameter =
                  parameter.$type === "text"
                    ? { ...parameter, value: val.currentTarget.value }
                    : {
                        ...parameter,
                        value: parseInt(val.currentTarget.value),
                      };
                updateParameter(currentStep, newParameter);
              }}
            />
            <DragHandle attributes={attributes} listeners={listeners} />
          </div>
          {(parameter.$type === "integer" || parameter.$type === "decimal") && (
            <div className="flex items-center justify-start rounded-md border border-gray-200">
              <p className="text-xs border-e border-gray-200 p-2 bg-gray-100 text-gray-700">
                unit
              </p>
              <p className="text-xs px-2">{parameter.unit}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParameterBox;
