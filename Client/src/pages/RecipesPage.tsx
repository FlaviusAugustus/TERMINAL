import { useState } from "react";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { useRecipes } from "@hooks/recipes/useGetRecipes.ts";
import Recipes from "@components/recipes/Recipes.tsx";
import { useRecipeDetails } from "@hooks/recipes/useGetRecipeDetails.ts";
import RecipeDetails from "@components/recipes/RecipeDetails.tsx";
import { useDeleteRecipe } from "@hooks/recipes/useDeleteRecipe.ts";
import TableLayout from "./layouts/TableLayout";
import ComponentOrLoader from "@components/shared/loader/ComponentOrLoader.tsx";
import Loader from "@components/shared/loader/Loader.tsx";
import EditRecipe from "@components/recipes/EditRecipe";
import ConfirmDeleteDialog from "@components/shared/dialog/ConfirmDeleteDialog.tsx";
import { toastError } from "@utils/toast.utils.tsx";

const RecipesPage = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [searchPhrase, setSearchPhrase] = useState("");

  const queryRecipes = useRecipes({
    pageNumber: pagination.pageIndex,
    pageSize: pagination.pageSize,
    desc: sorting[0]?.desc ?? true,
    searchPhrase,
  });

  const mutation = useDeleteRecipe({
    pageNumber: pagination.pageIndex,
    pageSize: pagination.pageSize,
    desc: sorting[0]?.desc ?? true,
  });

  const [recipeDetailsId, setRecipeDetailsId] = useState<string | null>(null);

  const dataQueryRecipeDetails = useRecipeDetails(recipeDetailsId);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteRecipeIds, setDeleteRecipeIds] = useState<string[] | null>(null);

  const openDeleteDialog = (id: string | string[]) => {
    const ids = Array.isArray(id) ? id : [id];
    setDeleteOpen(true);
    setDeleteRecipeIds(ids);
  };

  const changeRecipeDetails = (id: string) => {
    setDetailsOpen(true);
    setRecipeDetailsId(id);
  };

  const handleEditRecipe = (id: string) => {
    setEditOpen(true);
    setRecipeDetailsId(id);
  };

  const handleDelete = async (ids: string[] | null) => {
    if (!ids || ids.length === 0) return;
    try {
      await Promise.all(ids.map((id) => mutation.mutateAsync(id)));
      setDeleteOpen(false);
      setDeleteRecipeIds(null);
    } catch {
      toastError("Error deleting recipe(s)");
    }
  };

  return (
    <TableLayout>
      <ComponentOrLoader isLoading={queryRecipes.isLoading} loader={<Loader />}>
        <Recipes
          recipe={queryRecipes.data}
          sorting={sorting}
          setSorting={setSorting}
          pagination={pagination}
          setPagination={setPagination}
          onEdit={(id: string) => handleEditRecipe(id)}
          onDetails={(id: string) => changeRecipeDetails(id)}
          onDelete={openDeleteDialog}
          searchProps={{
            onSearch: setSearchPhrase,
            searchValue: searchPhrase,
            onClearSearch: () => setSearchPhrase(""),
          }}
        />
      </ComponentOrLoader>
      <ComponentOrLoader
        isLoading={dataQueryRecipeDetails.isLoading}
        loader={<Loader />}
      >
        <RecipeDetails
          recipe={dataQueryRecipeDetails.data}
          open={detailsOpen}
          openChange={setDetailsOpen}
        />
        <EditRecipe
          recipe={dataQueryRecipeDetails.data}
          open={editOpen}
          openChange={setEditOpen}
        />
        <ConfirmDeleteDialog
          onSubmit={() => handleDelete(deleteRecipeIds)}
          isSubmitting={mutation.isPending}
          isOpen={deleteOpen}
          description={`Deleting this recipe(s) is irreversible and will remove all associated data. Type delete to confirm.`}
          setIsOpen={setDeleteOpen}
        />
      </ComponentOrLoader>
    </TableLayout>
  );
};

export default RecipesPage;
