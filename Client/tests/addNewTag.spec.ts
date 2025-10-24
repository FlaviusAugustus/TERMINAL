import { expect, test } from "@playwright/test";
import { login } from "./helpers/mocks";

test.beforeEach(async ({ page }) => {
  await login(page);
});

test("should add new tag successfully", async ({ page }) => {
  await page.getByRole("button", { name: "Add new", exact: true }).click();
  await expect(
    page.getByRole("link", { name: "Tag", exact: true })
  ).toBeVisible();
  await page.getByRole("link", { name: "Tag", exact: true }).click();
  await expect(page).toHaveURL(/.*new-tag/);
  await expect(page.getByText("Add new tag").nth(1)).toBeVisible();
  await page.getByRole("textbox", { name: "Name:" }).fill("new-tag-test"); // Use a unique name to avoid conflicts
  await page.getByRole("button", { name: "Add Tag" }).click();
  await expect(page.getByText("Tag added succesfully")).toBeVisible();
  await page.goto("/tags");
  await expect(page.getByRole("cell", { name: "new-tag-test" })).toBeVisible();
});

test("should not add tag bacause of existing name", async ({ page }) => {
  await page.getByRole("button", { name: "Add new", exact: true }).click();
  await expect(
    page.getByRole("link", { name: "Tag", exact: true })
  ).toBeVisible();
  await page.getByRole("link", { name: "Tag", exact: true }).click();
  await expect(page).toHaveURL(/.*new-tag/);
  await expect(page.getByText("Add new tag").nth(1)).toBeVisible();
  await page.getByRole("textbox", { name: "Name:" }).fill("new-tag-test");
  await page.getByRole("button", { name: "Add Tag" }).click();
  await expect(page.getByText("Failed adding tag")).toBeVisible();
});

test("should show validation error for empty tag name", async ({ page }) => {
  await page.getByRole("button", { name: "Add new", exact: true }).click();
  await expect(
    page.getByRole("link", { name: "Tag", exact: true })
  ).toBeVisible();
  await page.getByRole("link", { name: "Tag", exact: true }).click();
  await expect(page).toHaveURL(/.*new-tag/);
  await expect(page.getByText("Add new tag").nth(1)).toBeVisible();
  await page.getByRole("textbox", { name: "Name:" }).fill("");
  await page.getByRole("button", { name: "Add Tag" }).click();
  await expect(page.getByText("is required")).toBeVisible();
});

test("should show validation error for invalid tag name", async ({ page }) => {
  await page.getByRole("button", { name: "Add new", exact: true }).click();
  await expect(
    page.getByRole("link", { name: "Tag", exact: true })
  ).toBeVisible();
  await page.getByRole("link", { name: "Tag", exact: true }).click();
  await expect(page).toHaveURL(/.*new-tag/);
  await expect(page.getByText("Add new tag").nth(1)).toBeVisible();
  await page.getByRole("textbox", { name: "Name:" }).fill(" ");
  await page.getByRole("button", { name: "Add Tag" }).click();
  await expect(
    page.getByText("name must be at least 3 characters long")
  ).toBeVisible();
});
