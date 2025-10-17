import { test } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";
import { NewRecipePage } from "./pages/addNewRecipePage";
import { mockRecipeCreation, mockParameters } from "./helpers/mocks";

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login();

  await mockParameters(page);
  await mockRecipeCreation(page);
});

// tests also name validation
test("adds new recipe successfully", async ({ page }) => {
  const recipe = new NewRecipePage(page);

  await recipe.openAddForm();
  await recipe.addStep();
  await recipe.dragAndDropStep(0);
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill("60");

  await recipe.dragAndDropStep(0);
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

  await recipe.addStep();
  await page.getByText("Step 2").click();
  await recipe.dragAndDropStep(2);
  await page.locator('[id="headlessui-combobox-button-:r1l:"]').click();
  await page.getByRole("option", { name: "without nucleation" }).click();
  await recipe.fillComment("This is comment!");

  await recipe.submit();
});
