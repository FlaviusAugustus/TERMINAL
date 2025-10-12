import { test } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";
import { DashboardPage } from "./pages/dashboardPage";
import {
  mockCount,
  mockRecentSamples
} from "./helpers/mocks";
import { recentSamplesMock } from "./helpers/mockedData";

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login();
});

test("displays correct project count", async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await mockCount(page, "**/api/projects/amount", 7);
  await dashboard.verifyCountCard("Total projects", 7, 1);
});

test("displays correct sample count", async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await mockCount(page, "**/api/samples/amount", 15);
  await dashboard.verifyCountCard("Total samples", 15, 1);
});

test("displays correct recipe count", async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await mockCount(page, "**/api/recipes/amount", 5);
  await dashboard.verifyCountCard("Total recipes", 5, 1);
});

test("displays correct user count", async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await mockCount(page, "**/api/users/amount", 12);
  await dashboard.verifyCountCard("Total users", 12, 1);
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

test("redirects to Samples on Browse All", async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await dashboard.clickBrowseAll(1);
  await dashboard.expectNavigationTo(/\/samples$/, "Samples");
});

test("redirects to Add new Sample", async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await dashboard.clickAddNew(1);
  await dashboard.expectNavigationTo(/\/new-sample$/, "Add new sample");
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

// Uncomment when implemented
// test("redirects to Users on Browse All", async ({ page }) => {
//   const dashboard = new DashboardPage(page);
//   await dashboard.clickBrowseAll(3);
//   await dashboard.expectNavigationTo(/\/users$/, "Users", 1);
// });

test("displays recent samples correctly", async ({ page }) => {
  await mockRecentSamples(page);
  const dashboard = new DashboardPage(page);

  await dashboard.verifyRecentSamples(recentSamplesMock.recentSamples);
});

// To DO: Add tests to Pinned Receipes once the feature is implemented
