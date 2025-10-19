import { Step, UpdateStep } from "./Step";

export type Recipe = {
  id: string;
  name: string;
};

export type RecipeDetailsDto = {
  id: string;
  name: string;
  steps: Step[];
};

export type UpdateRecipeRequest = {
  name: string;
  steps: UpdateStep[];
};

export const EMPTY_RECIPE: RecipeDetailsDto = {
  id: "",
  name: "",
  steps: [{ id: "", comment: "", parameters: [] }],
};
