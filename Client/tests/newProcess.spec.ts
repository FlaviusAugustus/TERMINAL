import { Page, test } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";
import { NewSamplePage } from "./pages/addNewSamplePage";
import {
  currentRecipes,
  mockParameters,
  mockProcessCreation,
  mockProjects,
  mockRecipeDetails,
  mockRecipes,
  mockRecipesAmount,
  mockTags,
} from "./helpers/mocks";
import { MOCKED_RECIPE_ID } from "./constants";

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login();

  await mockParameters(page, "**/api/parameters/");
  await mockProcessCreation(page);
  await mockProjects(page);
});

async function prepareSample(page: Page, sample: NewSamplePage) {
  await sample.openAddForm();

  await sample.dragAndDropStep(0);
  await page.locator('[id="headlessui-control-:r1j:"]').click();
  await page.locator('[id="headlessui-control-:r1j:"]').fill("60");
  await sample.dragAndDropStep(0);
  await sample.addStep();
  await sample.dragAndDropStep(2);

  await sample.fillComment("This is comment!");
}

test("adds new process successfully", async ({ page }) => {
  await mockTags(page);

  const sample = new NewSamplePage(page);
  await prepareSample(page, sample);
  await sample.submit();
});

test("adds new process with recipe successfully", async ({ page }) => {
  await mockRecipes(
    page,
    currentRecipes,
    "**/api/recipes?pageSize=1&pageNumber=0&desc=true"
  );
  await mockRecipesAmount(page);
  await mockRecipeDetails(page, MOCKED_RECIPE_ID);

  const sample = new NewSamplePage(page);
  await sample.openAddForm();
  await page.locator('[id="headlessui-combobox-button-:rp:"]').click();
  await page.getByRole("option", { name: "recipe" }).click();
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
