import {useState} from "react";
import {PaginationState, SortingState} from "@tanstack/react-table";
import {useRecipes} from "@hooks/recipes/useGetRecipes.ts";
import Recipes from "@components/Recipes/Recipes.tsx";
import {useRecipeDetails} from "@hooks/recipes/useGetRecipeDetails.ts";
import RecipeDetails from "@components/Recipes/RecipeDetails.tsx";

const RecipesPage = () => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const dataQueryRecipes = useRecipes({
        pageNumber: pagination.pageIndex,
        pageSize: pagination.pageSize,
        desc: sorting[0]?.desc ?? true,
    });

    const [recipeProjectId, setRecipeDetailsId] = useState<string | null>(null);

    const dataQueryRecipeDetails = useRecipeDetails(recipeProjectId);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex justify-center p-1 gap-1">
                <div className="flex-1 basis-3/5 bg-white rounded-md">
                    {dataQueryRecipes.isLoading ? (
                        <div className="flex justify-center">
                            <span className="loading loading-spinner loading-md"></span>
                        </div>
                    ) : (
                        <Recipes
                            dataQuery={dataQueryRecipes.data}
                            sorting={sorting}
                            setSorting={setSorting}
                            pagination={pagination}
                            setPagination={setPagination}
                            onChangeRecipeDetails={setRecipeDetailsId}
                        />
                    )}
                </div>
                <div className="flex-1 basis-2/5 bg-white p-3 rounded-md m-1">
                    {dataQueryRecipeDetails.isLoading ? (
                        <div className="flex justify-center">
                            <span className="loading loading-spinner loading-md"></span>
                        </div>
                    ) : (
                        <RecipeDetails dataQuery={dataQueryRecipeDetails.data}/>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecipesPage;
