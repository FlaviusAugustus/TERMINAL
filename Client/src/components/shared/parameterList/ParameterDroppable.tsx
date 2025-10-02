import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

/**
 * ParameterDroppable Component
 *
 * A component that serves as a droppable area for parameters in a recipe.
 *
 * @component
 */
const ParameterDroppable = ({ children }: { children: ReactNode }) => {
  const { setNodeRef } = useDroppable({
    id: "droppable",
  });

  return (
    <div
      ref={setNodeRef}
      className="h-full w-full flex flex-col gap-1 col-span-6"
    >
      {children}
    </div>
  );
};

export default ParameterDroppable;
