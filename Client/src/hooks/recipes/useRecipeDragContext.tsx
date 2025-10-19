// context for managing the recipe drag and drop functionality, depends on AddRecipeContext

import {
  closestCenter,
  DndContext,
  DragOverlay,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  useSensors,
  useSensor,
  PointerSensor,
  MeasuringStrategy,
} from "@dnd-kit/core";
import { createContext, ReactNode, useContext, useState } from "react";
import { v4 as uuidv4, validate } from "uuid";
import { useAddRecipeContext } from "./useAddRecipeContext.tsx";
import { arrayMove } from "@dnd-kit/sortable";
import { AllParameters } from "@api/models/Parameters.ts";
import { ParameterSelect } from "@components/shared/parameterList/ParameterSelect.tsx";

type RecipeDragContextValue = {
  onDragStart: (event: DragStartEvent) => void;
  onDragOver: (event: DragOverEvent) => void;
  onDragEnd: (event: DragEndEvent) => void;
};

const RecipeDragContext = createContext<RecipeDragContextValue | null>(null);

/**
 * useRecipeDragContext Hook
 *
 * Custom hook to use the RecipeDragContext.
 *
 * @hook
 */
function useRecipeDragContext(): RecipeDragContextValue {
  const context = useContext(RecipeDragContext);
  if (!context) {
    throw new Error(
      "useAddRecipeContext must be used within a AddRecipeProvider"
    );
  }
  return context;
}
const measuringConfig = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

/**
 * RecipeDragProvider Component
 *
 * Provides a context for managing drag and drop functionality for recipe parameters.
 *
 * @component
 */
const RecipeDragProvider = ({
  children,
  parameters,
}: {
  children: ReactNode;
  parameters: AllParameters[];
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { currentStep, findParameterIndex, getCurrentStep, updateStep } =
    useAddRecipeContext();

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (event: DragStartEvent) => {
    const target = event.active.id;
    setActiveId(target.toString());
  };

  const handleDragOver = (event: DragOverEvent) => {
    if (currentStep === null || event.over === null) return;

    const activeIndex = findParameterIndex(activeId);
    const overIndex = findParameterIndex(event.over?.id.toString());
    if (activeIndex === -1 || overIndex === -1 || activeIndex === overIndex)
      return;

    const step = getCurrentStep();
    if (step === null) return;

    const newStep = {
      ...step,
      parameters: arrayMove(step.parameters, activeIndex, overIndex),
    };

    updateStep(currentStep, newStep);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (activeId === null || currentStep === null || event.over === null)
      return;
    if (validate(activeId)) {
      setActiveId(null);
      return;
    }

    const item = parameters.find((x) => x.name === activeId);
    if (!item) {
      setActiveId(null);
      return;
    }

    const step = getCurrentStep();
    if (step === null) return;

    if (isDroppingBetweenItems(event)) {
      insertItemBetween(event);
      return;
    }

    const newStep = { ...step };

    const param = parameters.find((param) => param.name === item.name);
    if (!param) {
      setActiveId(null);
      return;
    }
    newStep.parameters = [
      ...newStep.parameters,
      {
        ...item,
        id: param.id,
        value: param.defaultValue,
      } as AllParameters,
    ];

    updateStep(currentStep, newStep);
    setActiveId(null);
  };

  const isDroppingBetweenItems = (event: DragEndEvent) =>
    event?.over?.id !== "droppable";

  const insertItemBetween = (event: DragEndEvent) => {
    const activeIndex = findParameterIndex(activeId);
    const overIndex = findParameterIndex(event?.over?.id.toString() ?? "");
    if (activeIndex === -1 || overIndex === -1 || activeIndex === overIndex) {
      if (activeIndex === -1 && overIndex !== -1) {
        const modifier = isBelowOverItem(event) ? 1 : 0;

        const step = getCurrentStep();
        if (step === null) return;

        const newIndex =
          overIndex >= 0
            ? overIndex + modifier
            : (step.parameters.length ?? 0) + 1;

        const item = parameters.find((x) => x.name === activeId);
        const id = uuidv4();
        if (!item) return;
        setActiveId(id);

        const param = parameters.find((param) => param.name === item!.name);
        const newParameters = [
          ...step.parameters.slice(0, newIndex),
          {
            ...item!,
            id: param!.id,
            value: param!.defaultValue,
          } as AllParameters,
          ...step.parameters.slice(newIndex, step.parameters.length),
        ];

        const newStep = {
          ...step,
          parameters: newParameters,
        };
        if (currentStep === null) return;
        updateStep(currentStep, newStep);
      }
      return;
    }
  };

  const isBelowOverItem = (event: DragEndEvent) => {
    const THRESHOLD = 1 / 2;
    return (
      event.over &&
      event.active.rect.current.translated &&
      event.active.rect.current.translated.top >
        event.over.rect.top + event.over.rect.height * THRESHOLD
    );
  };

  return (
    <DndContext
      measuring={measuringConfig}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      {!validate(activeId) && (
        <DragOverlay>
          {activeId && (
            <ParameterSelect
              parameter={{
                id: "",
                name: activeId,
                unit: "",
                step: 1,
                $type: "integer",
                value: 0,
                order: 0,
                parentId: "",
                defaultValue: 0,
              }}
            />
          )}
        </DragOverlay>
      )}
      {children}
    </DndContext>
  );
};

export { useRecipeDragContext, RecipeDragProvider };
