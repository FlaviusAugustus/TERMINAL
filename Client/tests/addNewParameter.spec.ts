import { expect, test } from "@playwright/test";
import { login } from "./helpers/mocks";

test.beforeEach(async ({ page }) => {
  await login(page);
});

test("should add new Integer parameter successfully", async ({ page }) => {
  await page.getByRole("button", { name: "Add new", exact: true }).click();
  await expect(
    page.getByRole("link", { name: "Parameter", exact: true })
  ).toBeVisible();
  await page.getByRole("link", { name: "Parameter", exact: true }).click();
  await expect(page).toHaveURL(/.*new-parameter/);
  await expect(page.getByText("Add new Parameter").nth(1)).toBeVisible();
  await page.getByRole("textbox", { name: "Name:" }).fill("new-param-int");
  await page.getByRole("combobox", { name: "Type:" }).click();
  await page.getByRole("option", { name: "Integer" }).click();
  await page.getByRole("textbox", { name: "Unit:" }).fill("miliseconds");
  await page.getByRole("button", { name: "Add Parameter" }).click();
  await expect(page.getByText("Parameter added successfully")).toBeVisible();
});

test("should add new Decimal parameter successfully", async ({ page }) => {
  await page.getByRole("button", { name: "Add new", exact: true }).click();
  await expect(
    page.getByRole("link", { name: "Parameter", exact: true })
  ).toBeVisible();
  await page.getByRole("link", { name: "Parameter", exact: true }).click();
  await expect(page).toHaveURL(/.*new-parameter/);
  await expect(page.getByText("Add new Parameter").nth(1)).toBeVisible();
  await page.getByRole("textbox", { name: "Name:" }).fill("new-param-decimal");
  await page.getByRole("combobox", { name: "Type:" }).click();
  await page.getByRole("option", { name: "Decimal" }).click();
  await page.getByRole("textbox", { name: "Unit:" }).fill("miliseconds");
  await page.getByRole("button", { name: "Add Parameter" }).click();
  await expect(page.getByText("Parameter added successfully")).toBeVisible();
});

test("should add new Text parameter successfully", async ({ page }) => {
  await page.getByRole("button", { name: "Add new", exact: true }).click();
  await expect(
    page.getByRole("link", { name: "Parameter", exact: true })
  ).toBeVisible();
  await page.getByRole("link", { name: "Parameter", exact: true }).click();
  await expect(page).toHaveURL(/.*new-parameter/);
  await expect(page.getByText("Add new Parameter").nth(1)).toBeVisible();
  await page.getByRole("textbox", { name: "Name:" }).fill("new-param-text");
  await page.getByRole("combobox", { name: "Type:" }).click();
  await page.getByRole("option", { name: "Text" }).click();
  await page.locator('[id="headlessui-control-:r2j:"]').click();
  await page.locator('[id="headlessui-control-:r2j:"]').fill("test-value-1");
  await page.getByRole("button").nth(1).click();
  await page.locator('[id="headlessui-control-:r2n:"]').click();
  await page.locator('[id="headlessui-control-:r2n:"]').fill("test-value-2");
  await page.getByRole("button", { name: "Add Parameter" }).click();
  await expect(page.getByText("Parameter added successfully")).toBeVisible();
});
