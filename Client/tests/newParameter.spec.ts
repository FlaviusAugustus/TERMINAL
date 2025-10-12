import { test } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";
import { NewParameterPage } from "./pages/addNewParameterPage";
import { mockParameterCreation, mockParameters } from "./helpers/mocks";

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login();
});

test("adds new parameter successfully", async ({ page }) => {
    await mockParameterCreation(page);
    const param = new NewParameterPage(page);
    await param.openAddForm();
    await param.fillName("New-Parameter-Test");
    await param.fillType("Decimal");
    await param.fillUnit("kg");
    await param.submit();
    await param.expectSuccessToast();
});

test("shows validation error for empty name", async ({ page }) => {
    const param = new NewParameterPage(page);
    await param.openAddForm();
    await param.fillName("");
    await param.fillUnit("");
    await param.submit();
    await param.expectValidationError("Name is required");
    await param.expectValidationError("Unit is required");
});

test("shows validation error for too short name", async ({ page }) => {
    const param = new NewParameterPage(page);
    await param.openAddForm();
    await param.fillName("A");
    await param.fillUnit("kg");
    await param.submit();
    await param.expectValidationError("Name must be at least 3 characters long");
});

// uncomment when backend validation for duplicate parameters is implemented
// test("shows failure toast for duplicate parameter name and type", async ({ page }) => {
//     await mockParameters(page);
//     const param = new NewParameterPage(page);
//     await param.openAddForm();
//     await param.fillName("Time");
//     await param.fillType("Decimal");
//     await param.fillUnit("h");
//     await param.submit();
//     await param.expectFailureToast();
// });