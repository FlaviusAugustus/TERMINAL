import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import clsx from "clsx";

type DragHandleProps = {
  className?: string;
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap | undefined;
};

/**
 * DragHandle Component
 *
 * A component that renders a drag handle icon for draggable items.
 *
 * @component
 */
const DragHandle = ({ className, attributes, listeners }: DragHandleProps) => {
  return (
    <svg
      className={clsx("cursor-grab hover:bg-gray-200 rounded", className)}
      {...attributes}
      {...listeners}
      fill="#333333"
      width="30px"
      height="30px"
      viewBox="0 0 36 36"
      version="1.1"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>drag-handle-line</title>
      <circle
        cx="15"
        cy="12"
        r="1.5"
        className="clr-i-outline clr-i-outline-path-1"
      ></circle>
      <circle
        cx="15"
        cy="24"
        r="1.5"
        className="clr-i-outline clr-i-outline-path-2"
      ></circle>
      <circle
        cx="21"
        cy="12"
        r="1.5"
        className="clr-i-outline clr-i-outline-path-3"
      ></circle>
      <circle
        cx="21"
        cy="24"
        r="1.5"
        className="clr-i-outline clr-i-outline-path-4"
      ></circle>
      <circle
        cx="21"
        cy="18"
        r="1.5"
        className="clr-i-outline clr-i-outline-path-5"
      ></circle>
      <circle
        cx="15"
        cy="18"
        r="1.5"
        className="clr-i-outline clr-i-outline-path-6"
      ></circle>
      <rect x="0" y="0" width="36" height="36" fillOpacity="0" />
    </svg>
  );
};

export default DragHandle;
