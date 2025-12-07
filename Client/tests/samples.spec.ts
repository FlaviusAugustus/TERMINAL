import { expect, test } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";
import { ProcessPage } from "./pages/processPage";
import { PROCESS_DETAILS_PATH, PROCESS_ENTITY } from "./constants";
import {
  currentProcesses,
  mockEntityDetails,
  mockProcesses,
  mockProcessesNextPage,
  resetProcesses,
  setCurrentData,
} from "./helpers/mocks";
import { processDetailsMock, processMock } from "./helpers/mockedData";

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login();
  resetProcesses();
});

test("renders table with correct columns", async ({ page }) => {
  const process = new ProcessPage(page);
  await process.goto();
  await expect(page.getByRole("cell", { name: "Code" }).first()).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Created At" }).locator("div")
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Actions" }).locator("div")
  ).toBeVisible();
});

//Uncomment when search functionality is fixed

// test("searches for existing sample", async ({ page }) => {
//   await mockProcesses(page);
//   await mockSearch(
//     page,
//     "**/api/samples/search**",
//     processesMock.processes,
//     "code",
//     "samples"
//   );
//   const searchedSample = "AX45";
//   const samples = new SamplesPage(page);
//   await samples.goto();
//   await samples.searchFor(searchedSample);
//   await expect(samples.getSampleCell(searchedSample)).toBeVisible();
// });

// test("shows nothing when no results found", async ({ page }) => {
//   await mockProcesses(page);
//   await mockSearch(
//     page,
//     "**/api/samples/search**",
//     processesMock.processes,
//     "code",
//     "samples"
//   );
//   const samples = new SamplesPage(page);
//   await samples.goto();
//   await samples.searchFor("NonExistingSample123");
//   await samples.expectNoResults();
// });

// test("clears search and restores sample list", async ({ page }) => {
//   const samples = new SamplesPage(page);
//   await samples.goto();
//   await samples.searchFor("New");
//   await samples.clearSearch();
//   await expect(samples.searchInput).toHaveValue("");
//   await samples.expectSomeResults();
// });

test("redirects to Add New Process page", async ({ page }) => {
  const process = new ProcessPage(page);
  await process.goto();
  await process.clickAddNew();
  await expect(page).toHaveURL(/.*new-process/);
  await expect(page.getByText("Add new process")).toBeVisible();
});

test("should show process details", async ({ page }) => {
  await mockProcesses(page);
  await mockEntityDetails(
    page,
    PROCESS_DETAILS_PATH,
    currentProcesses,
    processDetailsMock,
    PROCESS_ENTITY
  );

  const process = new ProcessPage(page);
  await process.goto();
  const firstRow = await process.getRow(1);
  await firstRow.getByRole("button").nth(0).click();
  await expect(page.getByText("Process Details")).toBeVisible();
  await expect(page.getByText("code", { exact: true })).toBeVisible();
  await expect(page.getByText("step count")).toBeVisible();
  await expect(page.getByText("creation date")).toBeVisible();
  await expect(page.getByText("comment", { exact: true })).toBeVisible();
  await expect(page.getByText("tags", { exact: true })).toBeVisible();
});

test("edits process details", async ({ page }) => {
  await mockProcesses(page);
  await mockEntityDetails(
    page,
    PROCESS_DETAILS_PATH,
    currentProcesses,
    processDetailsMock,
    PROCESS_ENTITY
  );

  const process = new ProcessPage(page);
  await process.goto();
  const firstRow = await process.getRow(1);
  await firstRow.getByRole("button").nth(1).click();
  await expect(page.getByText("Edit Process")).toBeVisible();

  // modify some process parameters
  await page.getByRole("spinbutton").fill("421");
  await page.locator('[id="headlessui-combobox-button-:r1d:"]').click();
  await page.getByRole("option", { name: "popular-sample" }).click();
  await page.getByRole("combobox", { name: "Tags:" }).press("Escape");
  await page.locator('[id="headlessui-combobox-button-:r1v:"]').click();
  await page.getByRole("option", { name: "Nitro" }).click();
  await page.getByRole("combobox", { name: "Projects:" }).press("Escape");
  await page.getByRole("button", { name: "Step 2" }).click();
  await page
    .getByRole("cell", { name: "dip-coating" })
    .getByRole("combobox")
    .selectOption("spin-coating");
  await page.getByRole("button", { name: "Save" }).click();
  await firstRow.getByRole("button").nth(1).click();

  // verify changed fields
  await expect(page.getByText("popular-sample")).toBeVisible();
  await expect(page.getByText("Nitro")).toBeVisible();
  await page.getByRole("button", { name: "Step 1" }).click();
  await expect(page.getByRole("cell", { name: "421" })).toBeVisible();
  await page.getByRole("button", { name: "Step 2" }).click();
  await expect(page.getByRole("cell", { name: "dip-coating" })).toBeVisible();
});

test("deletes process using X button", async ({ page }) => {
  await mockProcesses(page);
  await mockEntityDetails(
    page,
    PROCESS_DETAILS_PATH,
    currentProcesses,
    processDetailsMock,
    PROCESS_ENTITY
  );
  const process = new ProcessPage(page);
  await process.goto();
  const firstRow = await process.getRow(1);
  const firstRowContent = (await firstRow.textContent())?.trim() ?? "";
  await process.deleteRow(1);
  await expect(page.getByText(firstRowContent)).not.toBeVisible();
});

test("deletes selected process using X button", async ({ page }) => {
  await mockProcesses(page);
  await mockEntityDetails(
    page,
    PROCESS_DETAILS_PATH,
    currentProcesses,
    processDetailsMock,
    PROCESS_ENTITY
  );
  const process = new ProcessPage(page);
  await process.goto();
  const firstRow = await process.getRow(1);
  const firstRowContent = (await firstRow.textContent())?.trim() ?? "";
  await process.deleteUsingCheckbox(1);
  await expect(page.getByText(firstRowContent)).not.toBeVisible();
});

test("deletes all processes using checkbox", async ({ page }) => {
  setCurrentData(currentProcesses, processMock.processes);
  await mockProcesses(page);
  await mockEntityDetails(
    page,
    "**/api/process/557b6f33-f767-4969-989d-260ef7db6777", // needed for this specific test
    currentProcesses,
    processDetailsMock,
    PROCESS_ENTITY
  );
  const process = new ProcessPage(page);
  await process.goto();
  await process.deleteAllRows();
  await process.checkDeletionSuccess();
});

test("paginates through processes list", async ({ page }) => {
  await mockProcesses(page);
  await mockProcessesNextPage(page, processMock.processes);

  const process = new ProcessPage(page);
  await process.goto();
  const firstPageFirstRow = await (await process.getRow(1)).textContent();

  await page.locator("button:nth-child(5)").first().click();
  await page.waitForTimeout(500);

  const secondPageFirstRow = await (await process.getRow(1)).textContent();
  expect(firstPageFirstRow).not.toBe(secondPageFirstRow);

  await page.locator("button:nth-child(4)").first().click();
  await page.waitForTimeout(500);

  const firstPageFirstRowBack = await (await process.getRow(1)).textContent();
  expect(firstPageFirstRow).toBe(firstPageFirstRowBack);
});
