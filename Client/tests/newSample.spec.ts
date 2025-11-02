import { Page, test } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";
import { NewSamplePage } from "./pages/addNewSamplePage";
import {
  currentRecipes,
  mockParameters,
  mockRecipeDetails,
  mockRecipes,
  mockRecipesAmount,
  mockSampleCreation,
  mockTags,
} from "./helpers/mocks";
import { MOCKED_RECIPE_ID } from "./constants";

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login();

  await mockParameters(page);
  await mockSampleCreation(page);
});

async function prepareSample(page: Page, sample: NewSamplePage) {
  await sample.openAddForm();
  await sample.addStep();
  await sample.dragAndDropStep(0);
  await page
    .getByRole("tabpanel", { name: "Step" })
    .locator('input[type="text"]')
    .click();
  await page
    .getByRole("tabpanel", { name: "Step" })
    .locator('input[type="text"]')
    .fill("60");

  await sample.dragAndDropStep(0);
  await page
    .locator("div")
    .filter({ hasText: /^Pressurevalue drag-handle-lineunitTorr$/ })
    .getByRole("textbox")
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Pressurevalue drag-handle-lineunitTorr$/ })
    .getByRole("textbox")
    .fill("420");

  await sample.addStep();
  await page.getByText("Step 2").click();
  await sample.dragAndDropStep(2);
  await page.locator('[id="headlessui-combobox-button-:r2l:"]').click();
  await page.getByRole("option", { name: "without nucleation" }).click();
  await sample.fillComment("This is comment!");
}

test("adds new sample successfully", async ({ page }) => {
  await mockTags(page);

  const sample = new NewSamplePage(page);
  await prepareSample(page, sample);
  await sample.submit();
});

test("adds new sample with recipe successfully", async ({ page }) => {
  await mockRecipes(
    page,
    currentRecipes,
    "**/api/recipes?pageNumber=0&pageSize=1&desc=true"
  );
  await mockRecipesAmount(page);
  await mockRecipeDetails(page, MOCKED_RECIPE_ID);

  const sample = new NewSamplePage(page);
  await sample.openAddForm();
  await sample.addStep();
  await page.locator('[id="headlessui-combobox-button-:r19:"]').click();
  await page.getByRole("option", { name: "recipe" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Temperaturevalue drag-handle-lineunitCÔü░$/ })
    .getByRole("textbox")
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Temperaturevalue drag-handle-lineunitCÔü░$/ })
    .getByRole("textbox")
    .fill("420");
  await page.getByRole("textbox", { name: "Comment" }).click();
  await page
    .getByRole("textbox", { name: "Comment" })
    .fill("First step modified");
  await sample.submit();
});

test("resets form when reset button is pressed", async ({ page }) => {
  const sample = new NewSamplePage(page);
  await prepareSample(page, sample);
  await sample.reset();
});
