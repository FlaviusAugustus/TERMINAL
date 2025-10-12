import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";
import {
  currentRecipes,
  mockEntityDetails,
  mockRecipeDetails,
  mockRecipes,
  resetRecipes,
  setCurrentData,
} from "./helpers/mocks";
import { RecipePage } from "./pages/recipePage";
import {
  MOCKED_RECIPE_ID,
  RECIPE_DETAILS_PATH,
  RECIPE_ENTITY,
} from "./constants";
import { recipeDetailsMock } from "./helpers/mockedData";

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login();
  resetRecipes();
});

test("renders table with correct columns", async ({ page }) => {
  const recipes = new RecipePage(page);
  await recipes.goto();
  await expect(page.getByRole("cell", { name: "Name" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "Actions" })).toBeVisible();
});

// TODO: add tests for searching recipes when the functionality is implemented

test("redirects to Add New Recipe page", async ({ page }) => {
  const recipes = new RecipePage(page);
  await recipes.goto();
  await recipes.clickAddNew();
  await expect(page).toHaveURL(/.*new-recipe/);
  await expect(page.getByText("Add new recipe").first()).toBeVisible();
});

test("shows recipe details", async ({ page }) => {
  mockRecipes(page);
  mockRecipeDetails(page, MOCKED_RECIPE_ID);

  const recipes = new RecipePage(page);
  await recipes.goto();
  const firstRow = await recipes.getRow(1);
  await firstRow.getByRole("button").nth(0).click();
  await expect(
    page.getByRole("paragraph").filter({ hasText: "name" })
  ).toBeVisible();
  await expect(page.getByText("steps")).toBeVisible();
  await expect(page.getByText("Comment")).toBeVisible();
});

test("edits a recipe", async ({ page }) => {
  mockRecipes(page);
  mockRecipeDetails(page, MOCKED_RECIPE_ID);
  mockEntityDetails(
    page,
    RECIPE_DETAILS_PATH,
    currentRecipes,
    recipeDetailsMock,
    RECIPE_ENTITY
  );

  const recipes = new RecipePage(page);
  await recipes.goto();
  const firstRow = await recipes.getRow(1);
  await firstRow.getByRole("button").nth(1).click();
  await expect(
    page.getByRole("heading", { name: "Recipe details" })
  ).toBeVisible();
  await page.getByRole("button", { name: "Step 2" }).click();
  await page.getByRole("spinbutton").click();
  await page.getByRole("spinbutton").fill("1339");
  await page.getByText("SaveReset").click();
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Success updating sample")).toBeVisible();
});

test("restes while editing a recipe", async ({ page }) => {
  mockRecipes(page);
  mockRecipeDetails(page, MOCKED_RECIPE_ID);
  mockEntityDetails(
    page,
    RECIPE_DETAILS_PATH,
    currentRecipes,
    recipeDetailsMock,
    RECIPE_ENTITY
  );

  const recipes = new RecipePage(page);
  await recipes.goto();
  const firstRow = await recipes.getRow(1);
  await firstRow.getByRole("button").nth(1).click();
  await expect(
    page.getByRole("heading", { name: "Recipe details" })
  ).toBeVisible();
  await page.getByRole("button", { name: "Step 2" }).click();
  await page.getByRole("spinbutton").click();
  await page.getByRole("spinbutton").fill("1339");
  await page.getByText("SaveReset").click();
  await page.getByRole("button", { name: "Reset" }).click();
  await expect(page.getByRole("spinbutton")).toHaveValue("1333");
});

test("delete recipe using X button", async ({ page }) => {
  mockRecipes(page);
  mockRecipeDetails(page, MOCKED_RECIPE_ID);
  mockEntityDetails(
    page,
    RECIPE_DETAILS_PATH,
    currentRecipes,
    recipeDetailsMock,
    RECIPE_ENTITY
  );

  const recipes = new RecipePage(page);
  await recipes.goto();
  await recipes.deleteRow(1);
});

test("delete recipe using checkbox", async ({ page }) => {
  mockRecipes(page);
  mockRecipeDetails(page, MOCKED_RECIPE_ID);
  mockEntityDetails(
    page,
    RECIPE_DETAILS_PATH,
    currentRecipes,
    recipeDetailsMock,
    RECIPE_ENTITY
  );

  const recipes = new RecipePage(page);
  await recipes.goto();
  await recipes.deleteUsingCheckbox(1);
  await recipes.checkIfToastVisibleForMultipleDeletions();
});

test("deletes all recipes using checkbox", async ({ page }) => {
  mockRecipes(page);
  mockRecipeDetails(page, MOCKED_RECIPE_ID);
  mockEntityDetails(
    page,
    RECIPE_DETAILS_PATH,
    currentRecipes,
    recipeDetailsMock,
    RECIPE_ENTITY
  );
  const recipes = new RecipePage(page);
  await recipes.goto();
  await recipes.deleteAllRows();
  await recipes.checkIfToastVisibleForMultipleDeletions();
});
