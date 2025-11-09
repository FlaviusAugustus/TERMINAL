import { DialogComp } from "@components/shared/dialog/DialogComp.tsx";
import Detail from "@components/shared/common/Detail.tsx";
import StepsTableManagement from "@components/shared/table/StepsTableManagement";
import TableCard from "@components/shared/table/TableCard";
import TableView from "@components/shared/table/TableView";
import { useEditableStepTable } from "@hooks/steps/useEditableStepsTable.tsx";
import { RecipeDetailsDto } from "@api/models/Recipe";

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
  const { index, setIndex, table } = useEditableStepTable({
    steps: recipe != undefined ? recipe.steps : [],
  });

  return (
    <DialogComp
      isOpen={open}
      setIsOpen={openChange}
      title="Recipe details"
      className="w-full lg:w-[700px]"
      hasDynamicHeight
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
        </div>
        <Detail label="Comment">{recipe?.steps[index]?.comment}</Detail>
      </div>
    </DialogComp>
  );
};

export default RecipeDetails;
