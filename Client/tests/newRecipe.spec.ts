import { test } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";
import { NewRecipePage } from "./pages/addNewRecipePage";
import { mockParameters, mockRecipeCreation } from "./helpers/mocks";

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login();

  await mockParameters(page, "**/api/parameters/");
  await mockRecipeCreation(page);
});

// tests also name validation
test("adds new recipe successfully", async ({ page }) => {
  const recipe = new NewRecipePage(page);

  await recipe.openAddForm();
  await recipe.dragAndDropStep(0);
  await page.locator('[id="headlessui-control-:r13:"]').click();
  await page.locator('[id="headlessui-control-:r13:"]').fill("60");

  await recipe.dragAndDropStep(0);
  await page.locator('[id="headlessui-combobox-button-:r1f:"]').click();
  await page.getByRole("option", { name: "without nucleation" }).click();

  await recipe.addStep();
  
  await recipe.dragAndDropStep(2);
  await page.locator('[id="headlessui-control-:r2d:"]').click();

  await recipe.fillComment("This is comment!");
  await recipe.submit();
});
