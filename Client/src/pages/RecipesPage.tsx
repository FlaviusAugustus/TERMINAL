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
import { useSearchRecipes } from "@hooks/recipes/useSearchRecipes.ts";

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
  });

  const searchRecipesQuery = useSearchRecipes({
    searchPhrase,
    pageNumber: pagination.pageIndex,
    pageSize: pagination.pageSize,
  });

  const dataQueryRecipes = searchPhrase ? searchRecipesQuery : queryRecipes;

  const mutation = useDeleteRecipe({
    pageNumber: pagination.pageIndex,
    pageSize: pagination.pageSize,
    desc: sorting[0]?.desc ?? true,
  });

  const [recipeDetailsId, setRecipeDetailsId] = useState<string | null>(null);

  const dataQueryRecipeDetails = useRecipeDetails(recipeDetailsId);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const changeRecipeDetails = (id: string) => {
    setDetailsOpen(true);
    setRecipeDetailsId(id);
  };

  const handleEditRecipe = (id: string) => {
    setEditOpen(true);
    setRecipeDetailsId(id);
  };

  const handleDelete = async (id: string | null) => {
    if (!id) return;
    await mutation.mutateAsync(id);
  };

  return (
    <TableLayout>
      <ComponentOrLoader
        isLoading={dataQueryRecipes.isLoading}
        loader={<Loader />}
      >
        <Recipes
          recipe={dataQueryRecipes.data}
          sorting={sorting}
          setSorting={setSorting}
          pagination={pagination}
          setPagination={setPagination}
          onEdit={(id: string) => handleEditRecipe(id)}
          onDetails={(id: string) => changeRecipeDetails(id)}
          onDelete={async (id: string) => await handleDelete(id)}
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
      </ComponentOrLoader>
    </TableLayout>
  );
};

export default RecipesPage;
