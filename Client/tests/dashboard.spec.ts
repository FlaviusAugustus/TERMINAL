import { test } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";
import { DashboardPage } from "./pages/dashboardPage";
import { mockCount, mockRecentProcesess } from "./helpers/mocks";
import { recentProcessesMock } from "./helpers/mockedData";

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login();
});

test("displays correct project count", async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await mockCount(page, "**/api/projects/amount", 7);
  await dashboard.verifyCountCard("Total projects", 7);
});

test("displays correct processes count", async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await mockCount(page, "**/api/process/amount", 15);
  await dashboard.verifyCountCard("Total processes", 15);
});

test("displays correct recipe count", async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await mockCount(page, "**/api/recipes/amount", 5);
  await dashboard.verifyCountCard("Total recipes", 5);
});

test("displays correct user count", async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await mockCount(page, "**/api/users/amount", 12);
  await dashboard.verifyCountCard("Total users", 12);
});

test("redirects to Projects on Browse All", async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await dashboard.clickBrowseAll(0);
  await dashboard.expectNavigationTo(/\/projects$/, "Projects");
});

test("redirects to Add new Project", async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await dashboard.clickAddNew(0);
  await dashboard.expectNavigationTo(/\/new-project$/, "Add new project", 1);
});

test("redirects to Processes on Browse All", async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await dashboard.clickBrowseAll(1);
  await dashboard.expectNavigationTo(/\/processes$/, "Processes");
});

test("redirects to Add new Process", async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await dashboard.clickAddNew(1);
  await dashboard.expectNavigationTo(/\/new-process$/, "Add new process");
});

test("redirects to Recipes on Browse All", async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await dashboard.clickBrowseAll(2);
  await dashboard.expectNavigationTo(/\/recipes$/, "Recipes");
});

test("redirects to Add new Recipe", async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await dashboard.clickAddNew(2);
  await dashboard.expectNavigationTo(/\/new-recipe$/, "Add new recipe");
});

test("displays recent processes correctly", async ({ page }) => {
  await mockRecentProcesess(page);
  const dashboard = new DashboardPage(page);

  await dashboard.verifyRecentSamples(recentProcessesMock.recentSamples);
});
