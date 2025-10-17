import { test } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";
import { NewTagPage } from "./pages/addNewTagPage";
import { mockTagCreation, mockProjects, mockTags } from "./helpers/mocks";

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login();
});

test("adds new tag successfully", async ({ page }) => {
  await mockTagCreation(page);
  const tag = new NewTagPage(page);
  await tag.openAddForm();
  await tag.fillName("New-Tag-Test");
  await tag.submit();
  await tag.expectSuccessToast();
});

test("shows validation error for empty name", async ({ page }) => {
  const tag = new NewTagPage(page);
  await tag.openAddForm();
  await tag.fillName("");
  await tag.submit();
  await tag.expectValidationError("name is required");
});

test("shows validation error for too short name", async ({ page }) => {
  const tag = new NewTagPage(page);
  await tag.openAddForm();
  await tag.fillName("A");
  await tag.submit();
  await tag.expectValidationError("name must be at least 3 characters long");
});

test("shows failure toast for duplicate tag name", async ({ page }) => {
  await mockTags(page);
  const tag = new NewTagPage(page);
  await tag.openAddForm();
  await tag.fillName("Alpha");
  await tag.submit();
  await tag.expectFailureToast();
});
