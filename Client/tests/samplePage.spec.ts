import { expect, Page, test } from "@playwright/test";
import { Step } from "../src/api/models/Step";

type EditSampleRequest = { steps: Step[] };

async function login(page: Page) {
  await page.goto("/login");
  await page
    .getByRole("textbox", { name: "Email:" })
    .fill("admin@terminal.com");
  await page.getByRole("textbox", { name: "Password:" }).fill("1qaz@WSX");
  await page.getByRole("button", { name: "Sign in" }).click();
}

test.beforeEach(async ({ page }) => {
  await login(page);
});

test("should render table with correct columns", async ({ page }) => {
  await page.getByRole("link", { name: "Samples" }).click();
  await expect(page.getByText("Code").nth(2)).toBeVisible();
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

test("should search for existing sample", async ({ page }) => {
  await page.getByRole("link", { name: "Samples" }).click();
  await page.getByRole("textbox", { name: "Search" }).click();
  await page.getByRole("textbox", { name: "Search" }).press("CapsLock");
  await page.getByRole("textbox", { name: "Search" }).fill("AX45");
  await page.getByRole("textbox", { name: "Search" }).press("Enter");
  await expect(page.getByRole("cell", { name: "AX45" })).toBeVisible();
});

test("should show no results for non-existing sample", async ({ page }) => {
  await page.getByRole("link", { name: "Samples" }).click();
  await page.getByRole("textbox", { name: "Search" }).click();
  await page.getByRole("textbox", { name: "Search" }).press("CapsLock");
  await page
    .getByRole("textbox", { name: "Search" })
    .fill("NonExistingSample123");
  await page.getByRole("textbox", { name: "Search" }).press("Enter");
  expect(await page.getByRole("cell").count()).toBe(0);
});

test("should reset search and show all samples", async ({ page }) => {
  await page.getByRole("link", { name: "Samples" }).click();
  await page.getByRole("textbox", { name: "Search" }).click();
  await page.getByRole("textbox", { name: "Search" }).press("CapsLock");
  await page.getByRole("textbox", { name: "Search" }).fill("AX");
  await page.getByRole("button", { name: "Clear" }).click();
  await expect(page.getByRole("textbox", { name: "Search" })).toHaveValue("");
  expect(await page.getByRole("cell").count()).toBeGreaterThan(0);
});

test("should show sample details", async ({ page }) => {
  await page.getByRole("link", { name: "Samples" }).click();
  const firstRow = page.getByRole("row").nth(1);
  const editButton = await firstRow.getByRole("button").nth(0);
  await editButton.click();
  await expect(page.getByText("Sample Details")).toBeVisible();
  await expect(page.getByText("code", { exact: true })).toBeVisible();
  await expect(page.getByText("step count")).toBeVisible();
  await expect(page.getByText("creation date")).toBeVisible();
  await expect(page.getByText("comment")).toBeVisible();
  await expect(page.getByText("tags", { exact: true })).toBeVisible();
  await expect(page.getByText("steps")).toBeVisible();
});

test("should redirect Add new sample page", async ({ page }) => {
  await page.getByRole("link", { name: "Samples" }).click();
  await page.getByRole("link", { name: "Add new" }).getByRole("button").click();
  await expect(page).toHaveURL(/.*new-sample/);
  await expect(page.getByText("Add new sample")).toBeVisible();
});

test("should paginate samples", async ({ page }) => {
  await page.getByRole("link", { name: "Samples" }).click();
  const initialFirstRowText = await page.getByRole("row").nth(1).textContent();
  await page
    .locator(
      "div:nth-child(3) > .sm\\:w-10\\/12 > .h-\\[40rem\\] > .flex.p-3 > .flex.gap-1 > button:nth-child(5)"
    )
    .click();
  await page.waitForTimeout(500);
  const newFirstRowText = await page.getByRole("row").nth(1).textContent();
  expect(initialFirstRowText).not.toBe(newFirstRowText);
  await page
    .locator(
      "div:nth-child(3) > .sm\\:w-10\\/12 > .h-\\[40rem\\] > .flex.p-3 > .flex.gap-1 > button:nth-child(5)"
    )
    .click();
  const revertedFirstRowText = await page
    .locator("table tbody tr")
    .first()
    .textContent();
  expect(revertedFirstRowText).toBe(initialFirstRowText);
});

test("should edit sample and send correct step parameters", async ({
  page,
}) => {
  let capturedRequest: EditSampleRequest | null = null;

  await page.route("**/api/samples/*", async (route) => {
    if (route.request().method() === "PATCH") {
      capturedRequest = JSON.parse(route.request().postData() || "{}");
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ message: "Mocked success" }),
      });
    }
    return route.continue();
  });

  await page.getByRole("link", { name: "Samples" }).click();

  const firstRow = page.getByRole("row").nth(1);
  const editButton = firstRow.getByRole("button").nth(1);
  await editButton.click();

  await expect(page.getByText("Edit Sample")).toBeVisible();

  await page
    .getByRole("row", { name: /Nucleation Method/i })
    .getByRole("combobox")
    .selectOption("dip-coating");
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
    .getByRole("row", { name: /^CH₄/i })
    .getByRole("spinbutton")
    .fill("99");
  await page
    .getByRole("row", { name: /^B₂H₆/i })
    .getByRole("spinbutton")
    .fill("450");
  await page
    .getByRole("row", { name: /^H₂/i })
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

  await page.getByRole("button", { name: "Save" }).click();
  await page.waitForTimeout(500);

  const values = capturedRequest.steps[0].parameters.map((p) => p.value);

  expect(values).toEqual([
    "dip-coating", // Nucleation Method
    "nitrogen", // Additional gases
    "1.5", // Time
    "25", // Pressure
    "100", // Buffer
    "silicon dioxide", // Substrate
    "99", // CH4
    "450", // B2H6
    "2000", // H2
    "250", // B/C
    "720", // Temperature
    "1200", // Pmw
  ]);
});

test("should delete sample when clicking X button", async ({ page }) => {
  await page.route("**/api/samples/*", async (route) => {
    if (route.request().method() === "DELETE") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ message: "Mocked delete success" }),
      });
    }
    return route.continue();
  });

  await page.getByRole("link", { name: "Samples" }).click();

  const firstRow = page.getByRole("row").nth(1);
  const elementToDeleteContent = await firstRow.textContent();
  const deleteButton = firstRow.getByRole("button").nth(2);
  await deleteButton.click();

  await expect(page.getByText("Sample deleted successfully")).toBeVisible();
  await expect(
    page.getByRole("row", { name: elementToDeleteContent || "" })
  ).not.toBeVisible();
});

test("should delete selected samples", async ({ page }) => {
  await page.route("**/api/samples/*", async (route) => {
    if (route.request().method() === "DELETE") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ message: "Mocked delete success" }),
      });
    }
    return route.continue();
  });

  await page.getByRole("link", { name: "Samples" }).click();

  const rows = page.getByRole("row");
  const firstRow = rows.nth(1);
  const secondRow = rows.nth(2);

  const firstRowContent = await firstRow.textContent();
  const secondRowContent = await secondRow.textContent();

  await firstRow.getByRole("checkbox").first().click();
  await secondRow.getByRole("checkbox").first().click();

  page.getByRole("button", { name: /delete selected/i }).click();

  await expect(page.getByText(/samples deleted succesfully/i)).toBeVisible();
  await expect(
    page.getByRole("row", { name: firstRowContent || "" })
  ).not.toBeVisible();
  await expect(
    page.getByRole("row", { name: secondRowContent || "" })
  ).not.toBeVisible();
});

test("should delete all samples", async ({ page }) => {
  await page.route("**/api/samples/*", async (route) => {
    if (route.request().method() === "DELETE") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ message: "Mocked delete success" }),
      });
    }
    return route.continue();
  });

  await page.getByRole("link", { name: "Samples" }).click();

  await page.getByRole("row").nth(0).getByRole("checkbox").first().click();
  page.getByRole("button", { name: /delete selected/i }).click();
  await expect(page.getByText(/samples deleted succesfully/i)).toBeVisible();
});
