import { test } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";
import { NewRecipePage } from "./pages/addNewRecipePage";
import { mockParameters, mockRecipeCreation } from "./helpers/mocks";

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
  await page.locator('[id="headlessui-control-:r1h:"]').click();
  await page.locator('[id="headlessui-control-:r1h:"]').fill("60");

  await recipe.dragAndDropStep(0);
  await page.getByText("Step 1").click();
  await recipe.dragAndDropStep(2);
  await page.locator('[id="headlessui-control-:r1v:"]').click();
  await page.getByRole("option", { name: "without nucleation" }).click();
  await recipe.fillComment("This is comment!");

  await recipe.submit();
});
