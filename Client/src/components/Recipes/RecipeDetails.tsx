import { RecipeDetailsDto } from "@api/terminalSchemas.ts";
import { DialogComp } from "@components/Shared/DialogComp.tsx";
import Detail from "@components/Shared/Detail";
import StepsTableManagement from "@components/Shared/Table/StepsTableManagement";
import TableCard from "@components/Shared/Table/TableCard";
import TableView from "@components/Shared/Table/TableView";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import useParameterColumns from "@hooks/useParameterColumns";

export interface RecipeDetailsProps {
  recipe: RecipeDetailsDto | undefined;
  open: boolean;
  openChange: (arg0: boolean) => void;
}

/**
 * RecipeDetails Component
 *
 * Displays details of a recipe including its name and steps.
 * Provides functionality to delete the recipe.
 *
 * @component
 * @param {RecipeDetailsProps} props - The properties for the component.
 */
const RecipeDetails = ({ recipe, open, openChange }: RecipeDetailsProps) => {
  const [index, setIndex] = useState(0);
  const columns = useParameterColumns();

  const pageData =
    recipe?.steps && recipe?.steps?.length != 0
      ? (recipe?.steps[index].parameters ?? [])
      : [];

  const table = useReactTable({
    columns: columns,
    data: pageData,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination: {
        pageIndex: index,
        pageSize: pageData.length,
      },
    },
  });
  return (
    <DialogComp
      isOpen={open}
      setIsOpen={openChange}
      title="Recipe details"
      className="w-full lg:w-[700px]"
    >
      <div className="space-y-3 font-light text-sm text-gray-600">
        <Detail label="name">{recipe?.name}</Detail>
        <div className="w-full">
          {recipe?.steps?.length !== 0 && (
            <Detail label="steps">
              <div className="flex flex-col gap-2">
                <StepsTableManagement
                  activeIndex={index}
                  activeIndexChange={setIndex}
                  steps={recipe?.steps ?? []}
                />
                <TableCard className="!h-full !shadow-none">
                  <TableView table={table} />
                </TableCard>
              </div>
            </Detail>
          )}
        </div>{" "}
      </div>
    </DialogComp>
  );
};

export default RecipeDetails;
