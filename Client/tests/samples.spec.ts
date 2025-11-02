import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";
import { SamplesPage } from "./pages/samplesPage";
import { SAMPLE_DETAILS_PATH, SAMPLE_ENTITY } from "./constants";
import {
  currentSamples,
  mockEntityDetails,
  mockSamples,
  mockSamplesNextPage,
  mockSearch,
  resetSamples,
  setCurrentData,
} from "./helpers/mocks";
import {
  sampleDetailsMock,
  sampleMock,
  samplesMock,
} from "./helpers/mockedData";

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login();
  resetSamples();
});

test("renders table with correct columns", async ({ page }) => {
  const samples = new SamplesPage(page);
  await samples.goto();
  await expect(
    page.getByRole("row", { name: "Code", exact: true }).locator("div")
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Project Name" }).locator("div")
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Created At" }).locator("div")
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Actions" }).locator("div")
  ).toBeVisible();
});

test("searches for existing sample", async ({ page }) => {
  await mockSamples(page);
  await mockSearch(
    page,
    "**/api/samples/search**",
    samplesMock.samples,
    "code",
    "samples"
  );
  const searchedSample = "AX45";
  const samples = new SamplesPage(page);
  await samples.goto();
  await samples.searchFor(searchedSample);
  await expect(samples.getSampleCell(searchedSample)).toBeVisible();
});

test("shows nothing when no results found", async ({ page }) => {
  await mockSamples(page);
  await mockSearch(
    page,
    "**/api/samples/search**",
    samplesMock.samples,
    "code",
    "samples"
  );
  const samples = new SamplesPage(page);
  await samples.goto();
  await samples.searchFor("NonExistingSample123");
  await samples.expectNoResults();
});

test("clears search and restores sample list", async ({ page }) => {
  const samples = new SamplesPage(page);
  await samples.goto();
  await samples.searchFor("New");
  await samples.clearSearch();
  await expect(samples.searchInput).toHaveValue("");
  await samples.expectSomeResults();
});

test("redirects to Add New Project page", async ({ page }) => {
  const samples = new SamplesPage(page);
  await samples.goto();
  await samples.clickAddNew();
  await expect(page).toHaveURL(/.*new-sample/);
  await expect(page.getByText("Add new sample")).toBeVisible();
});

test("should show sample details", async ({ page }) => {
  await mockSamples(page);
  await mockEntityDetails(
    page,
    SAMPLE_DETAILS_PATH,
    currentSamples,
    sampleDetailsMock,
    SAMPLE_ENTITY
  );

  const samples = new SamplesPage(page);
  await samples.goto();
  const firstRow = await samples.getRow(1);
  await firstRow.getByRole("button").nth(0).click();
  await expect(page.getByText("Sample Details")).toBeVisible();
  await expect(page.getByText("code", { exact: true })).toBeVisible();
  await expect(page.getByText("step count")).toBeVisible();
  await expect(page.getByText("creation date")).toBeVisible();
  await expect(page.getByText("comment", { exact: true })).toBeVisible();
  await expect(page.getByText("tags", { exact: true })).toBeVisible();
});

test("edits sample details", async ({ page }) => {
  await mockSamples(page);
  await mockEntityDetails(
    page,
    SAMPLE_DETAILS_PATH,
    currentSamples,
    sampleDetailsMock,
    SAMPLE_ENTITY
  );

  const samples = new SamplesPage(page);
  await samples.goto();
  const firstRow = await samples.getRow(1);
  await firstRow.getByRole("button").nth(1).click();
  await expect(page.getByText("Edit Sample")).toBeVisible();

  await page
    .getByRole("row", { name: /Additional gases/i })
    .getByRole("combobox")
    .selectOption("nitrogen");
  await page
    .getByRole("row", { name: /^Time/i })
    .getByRole("spinbutton")
    .fill("1.5");
  await page
    .getByRole("row", { name: /^Pressure/i })
    .getByRole("spinbutton")
    .fill("25");
  await page
    .getByRole("row", { name: /^Buffer/i })
    .getByRole("spinbutton")
    .fill("100");
  await page
    .getByRole("row", { name: /^Substrate/i })
    .getByRole("combobox")
    .selectOption("silicon dioxide");
  await page
    .getByRole("row", { name: /^CHÔéä/i })
    .getByRole("spinbutton")
    .fill("99");
  await page
    .getByRole("row", { name: /^BÔééHÔéć/i })
    .getByRole("spinbutton")
    .fill("450");
  await page
    .getByRole("row", { name: /^HÔéé/i })
    .getByRole("spinbutton")
    .fill("2000");
  await page
    .getByRole("row", { name: /^B\/C/i })
    .getByRole("spinbutton")
    .fill("250");
  await page
    .getByRole("row", { name: /^Temperature/i })
    .getByRole("spinbutton")
    .fill("720");
  await page
    .getByRole("row", { name: /^Pmw/i })
    .getByRole("spinbutton")
    .fill("1200");

  // verify random two fields
  await expect(
    page.getByRole("row", { name: /^Time/i }).getByRole("spinbutton")
  ).toHaveValue("1.5");
  await expect(
    page.getByRole("row", { name: /^Pressure/i }).getByRole("spinbutton")
  ).toHaveValue("25");

  await page.getByRole("button", { name: "Save" }).click();
  await page.waitForTimeout(500);
  await expect(page.getByText("Success updating sample")).toBeVisible();
});

test("deletes sample using X button", async ({ page }) => {
  await mockSamples(page);
  await mockEntityDetails(
    page,
    SAMPLE_DETAILS_PATH,
    currentSamples,
    sampleDetailsMock,
    SAMPLE_ENTITY
  );
  const samples = new SamplesPage(page);
  await samples.goto();
  await samples.deleteRow(1);
});

test("deletes selected samples using X button", async ({ page }) => {
  await mockSamples(page);
  await mockEntityDetails(
    page,
    SAMPLE_DETAILS_PATH,
    currentSamples,
    sampleDetailsMock,
    SAMPLE_ENTITY
  );
  const samples = new SamplesPage(page);
  await samples.goto();
  await samples.deleteUsingCheckbox(1);
  await samples.checkIfToastVisible();
});

test("deletes all samples using checkbox", async ({ page }) => {
  setCurrentData(currentSamples, sampleMock.samples);
  await mockSamples(page);
  await mockEntityDetails(
    page,
    SAMPLE_DETAILS_PATH,
    currentSamples,
    sampleDetailsMock,
    SAMPLE_ENTITY
  );
  const samples = new SamplesPage(page);
  await samples.goto();
  await samples.deleteAllRows();
  await samples.checkDeletionSuccess();
  await samples.checkIfToastVisible();
});

test("paginates through samples list", async ({ page }) => {
  await mockSamples(page);
  await mockSamplesNextPage(page, sampleMock.samples);

  const samples = new SamplesPage(page);
  await samples.goto();
  const firstPageFirstRow = await (await samples.getRow(1)).textContent();

  await page
    .locator(
      "div:nth-child(3) > .sm\\:w-10\\/12 > .h-\\[40rem\\] > .flex.p-3 > .flex.gap-1 > button:nth-child(5)"
    )
    .click();
  await page.waitForTimeout(500);

  const secondPageFirstRow = await (await samples.getRow(1)).textContent();
  expect(firstPageFirstRow).not.toBe(secondPageFirstRow);

  await page
    .locator(
      "div:nth-child(3) > .sm\\:w-10\\/12 > .h-\\[40rem\\] > .flex.p-3 > .flex.gap-1 > button:nth-child(4)"
    )
    .click();
  await page.waitForTimeout(500);

  const firstPageFirstRowBack = await (await samples.getRow(1)).textContent();
  expect(firstPageFirstRow).toBe(firstPageFirstRowBack);
});
