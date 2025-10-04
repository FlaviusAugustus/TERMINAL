import DragHandle from "@components/shared/parameterList/DragHandle.tsx";
import { useDraggable } from "@dnd-kit/core";
import { AllParameters } from "@api/models/Parameters.ts";

type ParameterBoxProps = {
  parameter: AllParameters;
};

/**
 * ParameterSelect Component
 *
 * A component that displays a selectable parameter box with drag-and-drop functionality.
 *
 * @component
 */
export const ParameterSelect = ({ parameter }: ParameterBoxProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: parameter.name,
    data: parameter,
  });

  return (
    !isDragging && (
      <div className="px-2" ref={setNodeRef}>
        <div className="border border-gray-200 rounded flex items-center bg-white justify-between shadow-sm">
          <div className="p-2">
            <p className="text-xs">{parameter.name}</p>
          </div>
          <div className="bg-gray-100 border-s border-gray-200 p-1">
            <DragHandle listeners={listeners} attributes={attributes} />
          </div>
        </div>
      </div>
    )
  );
};
