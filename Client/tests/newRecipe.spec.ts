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

// checks also name validation
test("adds new recipe successfully", async ({ page }) => {
  const recipe = new NewRecipePage(page);

  await recipe.openAddForm();
  await recipe.dragAndDropStep(0);
  await recipe.dragAndDropStep(0);
  await recipe.addStep();
  await recipe.dragAndDropStep(2);
  await recipe.fillComment("This is comment!");
  await recipe.submit();
});
