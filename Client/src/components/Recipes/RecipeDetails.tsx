import { RecipeDetailsDto } from "@api/terminalSchemas.ts";
import { DialogComp } from "@components/Shared/DialogComp.tsx";
import Detail from "@components/Shared/Detail";
import StepDetails from "@components/Shared/StepDetails";

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
  return (
    <DialogComp
      isOpen={open}
      setIsOpen={openChange}
      title="Sample details"
      className="w-full lg:w-[700px]"
    >
      <div className="space-y-3 font-light text-sm text-gray-600">
        <Detail label="name">{recipe?.name}</Detail>
        <Detail label="steps">
          <StepDetails steps={recipe?.steps ?? []} editable={false} />
        </Detail>
      </div>
    </DialogComp>
  );
};

export default RecipeDetails;
