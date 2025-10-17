import { RecipeDetailsDto } from "@api/models/Recipe";
import Detail from "@components/shared/common/Detail.tsx";
import {
  DialogButton,
  DialogComp,
} from "@components/shared/dialog/DialogComp.tsx";
import StepsTableManagement from "@components/shared/table/StepsTableManagement";
import TableCard from "@components/shared/table/TableCard";
import TableView from "@components/shared/table/TableView";
import useUpdateRecipe from "@hooks/recipes/useUpdateRecipe";
import { useEditableStepTable } from "@hooks/steps/useEditableStepsTable.tsx";
import useEditableForm from "@hooks/steps/useStepsForm.tsx";
import { DialogSubmitButton } from "@components/shared/dialog/DialogSubmitButton.tsx";
import { toastError } from "@utils/toast.utils.tsx";

export interface RecipeDetailsDtoProps {
  recipe: RecipeDetailsDto | undefined;
  open: boolean;
  openChange: (arg0: boolean) => void;
}

/**
 * EditRecipe Component
 *
 * Displays details of a sample including code, creation date, tags, comment, and number of steps.
 * Allows for editing parameter values.
 *
 * @component
 * @param {RecipeDetailsDtoProps} - The properties for the component.
 */
const EditRecipe = ({ recipe, open, openChange }: RecipeDetailsDtoProps) => {
  const {
    data: newRecipe,
    setData: setNewRecipe,
    hasChanges: valueChanged,
    resetForm,
  } = useEditableForm<RecipeDetailsDto>(recipe);

  const { index, setIndex, table } = useEditableStepTable({
    steps: newRecipe?.steps ?? [],
    updateData: (rowIndex: number, _: string, value: unknown) => {
      const nsample = structuredClone(newRecipe) as RecipeDetailsDto;
      nsample.steps![index].parameters![rowIndex].value = value as
        | string
        | number;
      setNewRecipe(nsample);
    },
  });
  const mutation = useUpdateRecipe();

  const handleUpdate = async () => {
    if (!newRecipe) return;

    try {
      await mutation.mutateAsync(newRecipe);
      openChange(false);
    } catch {
      toastError(`Error while updating recipe`);
    }
  };

  return (
    <DialogComp
      isOpen={open}
      setIsOpen={openChange}
      title="Recipe details"
      className="w-full lg:w-[700px]"
    >
      <div className="space-y-3 font-light text-sm text-gray-600">
        <Detail label="name">{newRecipe?.name}</Detail>
        <div className="w-full">
          {newRecipe?.steps?.length !== 0 && (
            <Detail label="steps">
              <div className="flex flex-col gap-2">
                <StepsTableManagement
                  activeIndex={index}
                  activeIndexChange={setIndex}
                  steps={newRecipe?.steps ?? []}
                />
                <TableCard className="!h-full !shadow-none">
                  <TableView table={table} />
                </TableCard>
              </div>
            </Detail>
          )}
        </div>
        <div className="flex gap-2">
          <DialogSubmitButton
            disabled={!valueChanged}
            className="!w-fit hover:border-green-400"
            onClick={handleUpdate}
            isSubmitting={mutation.isPending}
          >
            Save
          </DialogSubmitButton>
          <DialogButton
            disabled={!valueChanged}
            className="!w-fit hover:border-red-400"
            onClick={resetForm}
          >
            Reset
          </DialogButton>
        </div>
      </div>
    </DialogComp>
  );
};

export default EditRecipe;
