import { test } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";
import { NewProjectPage } from "./pages/addNewProjectPage";
import { mockProjectCreation, mockProjects } from "./helpers/mocks";

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login();
});

test("adds new project successfully", async ({ page }) => {
  await mockProjectCreation(page);
  const project = new NewProjectPage(page);
  await project.openAddForm();
  await project.fillName("New-Project-Test");
  await project.submit();
  await project.expectSuccessToast();
});

test("shows validation error for empty name", async ({ page }) => {
  const project = new NewProjectPage(page);
  await project.openAddForm();
  await project.fillName("");
  await project.submit();
  await project.expectValidationError("name is required");
});

test("shows validation error for too short name", async ({ page }) => {
  const project = new NewProjectPage(page);
  await project.openAddForm();
  await project.fillName("A");
  await project.submit();
  await project.expectValidationError("name must be at least 3 characters long");
});

test("shows failure toast for duplicate project name", async ({ page }) => {
  await mockProjects(page);
  const project = new NewProjectPage(page);
  await project.openAddForm();
  await project.fillName("Alpha");
  await project.submit();
  await project.expectFailureToast();
});


