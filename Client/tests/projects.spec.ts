import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";
import { ProjectsPage } from "./pages/projectPage";
import {
  MOCKED_PROJECT_ID,
  PROJECT_DETAILS_PATH,
  PROJECT_ENTITY,
} from "./constants";
import {
  resetProjects,
  mockProjectsAll,
  mockSearch,
  mockProjectDeactivation,
  mockEntityDetails,
  currentProjects,
} from "./helpers/mocks";
import { projectDetailsMock, projectsMock } from "./helpers/mockedData";

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login();
  resetProjects();
});

test("renders table with correct columns", async ({ page }) => {
  const projects = new ProjectsPage(page);
  await projects.goto();
  await expect(page.getByRole("cell", { name: "Name" })).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Active" }).locator("div")
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Actions" }).locator("div")
  ).toBeVisible();
});

test("searches for existing project", async ({ page }) => {
  await mockProjectsAll(page);
  await mockSearch(
    page,
    "**/api/projects/search**",
    projectsMock.projects,
    "name",
    "projects"
  );
  const searchedProject = "Upturn";
  const projects = new ProjectsPage(page);
  await projects.goto();
  await projects.searchFor(searchedProject);
  await expect(projects.getProjectCell(searchedProject)).toBeVisible();
});

test("shows nothing when no results found", async ({ page }) => {
  await mockProjectsAll(page);
  await mockSearch(
    page,
    "**/api/projects/search**",
    projectsMock.projects,
    "name",
    "projects"
  );
  const projects = new ProjectsPage(page);
  await projects.goto();
  await projects.searchFor("NonExistingProject123");
  await projects.expectNoResults();
});

test("clears search and restores project list", async ({ page }) => {
  const projects = new ProjectsPage(page);
  await projects.goto();
  await projects.searchFor("New");
  await projects.clearSearch();
  await expect(projects.searchInput).toHaveValue("");
  await projects.expectSomeResults();
});

test("redirects to Add New Project page", async ({ page }) => {
  const projects = new ProjectsPage(page);
  await projects.goto();
  await projects.clickAddNew();
  await expect(page).toHaveURL(/.*new-project/);
  await expect(page.getByText("Add new project").nth(1)).toBeVisible();
});

test("edits project name and status", async ({ page }) => {
  await mockProjectsAll(page);
  await mockEntityDetails(
    page,
    PROJECT_DETAILS_PATH,
    currentProjects,
    projectDetailsMock,
    PROJECT_ENTITY
  );
  await mockProjectDeactivation(page, MOCKED_PROJECT_ID);

  const projects = new ProjectsPage(page);
  await projects.goto();

  const firstRow = await projects.getRow(1);
  await firstRow.getByRole("button").nth(0).click();
  await expect(page.getByText("Edit project")).toBeVisible();

  await page.getByRole("textbox", { name: "Name" }).fill("EditedProjectName");
  await page.getByRole("button", { name: "Submit changes" }).click();
  await expect(page.getByText("Name updated successfully")).toBeVisible();

  await projects.closeEditModal();
  await firstRow.getByRole("button").nth(0).click();

  await page.getByRole("switch", { name: "Status" }).click();
  await page.getByRole("button", { name: "Submit changes" }).click();
  await expect(
    page.getByText("Project status updated successfully")
  ).toBeVisible();
});

test("deletes project using X button", async ({ page }) => {
  await mockProjectsAll(page);
  await mockEntityDetails(
    page,
    PROJECT_DETAILS_PATH,
    currentProjects,
    projectDetailsMock,
    PROJECT_ENTITY
  );

  const projects = new ProjectsPage(page);
  await projects.goto();
  await projects.deleteRow(1);
  await projects.confirmDeletion();
  await projects.checkDeletionSuccess();
});

test("deletes selected projects using X button", async ({ page }) => {
  await mockProjectsAll(page);
  await mockEntityDetails(
    page,
    PROJECT_DETAILS_PATH,
    currentProjects,
    projectDetailsMock,
    PROJECT_ENTITY
  );

  const projects = new ProjectsPage(page);
  await projects.goto();
  await projects.deleteUsingCheckbox(1);
  await projects.confirmDeletion();
  await projects.checkDeletionSuccess();
});

test("deletes all projects using checkbox", async ({ page }) => {
  await mockProjectsAll(page);
  await mockEntityDetails(
    page,
    PROJECT_DETAILS_PATH,
    currentProjects,
    projectDetailsMock,
    PROJECT_ENTITY
  );

  const projects = new ProjectsPage(page);
  await projects.goto();
  await projects.deleteAllRows();
  await projects.confirmDeletion();
  await projects.checkDeletionSuccess();
});
