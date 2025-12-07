import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";
import { ParametersPage } from "./pages/parametersPage";
import {
  currentParameters,
  mockEntityDetails,
  mockParameterDeactivation,
  mockParameters,
  mockSearch,
  resetParameters,
  setCurrentData,
} from "./helpers/mocks";
import {
  parameterDetailsMock,
  parametersMock,
  parameterMock,
} from "./helpers/mockedData";
import {
  MOCKED_PARAMETER_ID,
  PARAMETER_DETAILS_PATH,
  PARAMETER_ENTITY,
} from "./constants";

export const parametersMockForSearching = {
  parameters: [
    {
      $type: "integer",
      step: 1,
      defaultValue: 0,
      unit: "Torr",
      id: "c452eb60-0325-4cad-91b3-08a7bfd08777",
      name: "Pressure",
      order: 0,
      parentId: null,
    },
    {
      $type: "decimal",
      step: 0.1,
      defaultValue: 0.1,
      unit: "h",
      id: "9c326ab7-a386-4e7e-b1fe-0dd4a59467aa",
      name: "Time",
      order: 0,
      isActive: true,
      parentId: null
    }
  ],
};

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login();
  resetParameters();
});

test("renders table with correct columns", async ({ page }) => {
  const params = new ParametersPage(page);
  await params.goto();
  await expect(page.getByRole("cell", { name: "Name" })).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Type" }).locator("div")
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Actions" }).locator("div")
  ).toBeVisible();
});

test("searches for existing param", async ({ page }) => {
  await mockParameters(page, "**/api/parameters/", parametersMockForSearching.parameters);
  await mockSearch(
    page,
    "**/api/parameters/search**",
    parametersMock.parameters,
    "name",
    "parameters"
  );
  const searchedParam = "Time";
  const params = new ParametersPage(page);
  await params.goto();
  await params.searchFor(searchedParam);
  await expect(params.getProjectCell(searchedParam)).toBeVisible();
});

test("shows nothing when no results found", async ({ page }) => {
  await mockParameters(page);
  await mockSearch(
    page,
    "**/api/parameters/search**",
    parametersMock.parameters,
    "name",
    "parameters"
  );
  const params = new ParametersPage(page);
  await params.goto();
  await params.searchFor("NonExistingParam123");
  await params.expectNoResults();
});

test("redirects to Add New Parameter page", async ({ page }) => {
  const params = new ParametersPage(page);
  await params.goto();
  await params.clickAddNew();
  await expect(page).toHaveURL(/.*new-parameter/);
  await expect(page.getByText("Add new parameter").nth(1)).toBeVisible();
});

test("shows params details", async ({ page }) => {
  await mockParameters(page);
  await mockEntityDetails(
    page,
    PARAMETER_DETAILS_PATH,
    currentParameters,
    parameterDetailsMock,
    PARAMETER_ENTITY
  );

  const params = new ParametersPage(page);
  await params.goto();
  const firstRow = await params.getRow(1);
  await firstRow.getByRole("button").nth(0).click();
  await expect(page.getByText("Parameter details")).toBeVisible();
  await expect(page.getByText("name", { exact: true })).toBeVisible();
  await expect(page.getByText("step")).toBeVisible();
  await expect(page.getByText("unit")).toBeVisible();
});

test("deactivate param using X button", async ({ page }) => {
  await mockParameters(page);
  await mockParameterDeactivation(page, MOCKED_PARAMETER_ID);
  const params = new ParametersPage(page);
  await params.goto();
  await params.deleteRow(1);
  await params.checkDeactivationSuccess();
});

test("deactivates selected params using X button", async ({ page }) => {
  await mockParameters(page);
  await mockParameterDeactivation(page, MOCKED_PARAMETER_ID);
  const params = new ParametersPage(page);
  await params.goto();
  await params.deleteUsingCheckbox(1);
  await params.checkDeactivationSuccess();
});

test("deactivate all params using checkbox", async ({ page }) => {
  setCurrentData(currentParameters, parameterMock.parameters);
  await mockParameters(page);
  await mockParameterDeactivation(page, MOCKED_PARAMETER_ID);

  const params = new ParametersPage(page);
  await params.goto();
  await params.deleteAllRows();
  await params.checkDeactivationSuccess();
});
