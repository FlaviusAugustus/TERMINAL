import { expect, test } from "@playwright/test";
import { login } from "./helpers/mocks";

test("dashboard basic functionality", async ({ page }) => {
  await login(page);

  await page.getByRole("button", { name: "Add new", exact: true }).click();
  await expect(
    page.getByRole("link", { name: "Recipe", exact: true })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Process", exact: true })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Project", exact: true })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Parameter", exact: true })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Tag", exact: true })
  ).toBeVisible();

  // Verify that the dashboard page is loaded and all links are present
  await expect(page.getByText("Dashboard").first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Projects" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Processes" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Recipes" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Parameters" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Tags" })).toBeVisible();

  // Test if navigation to each section works
  await page.getByRole("link", { name: "Projects" }).click();
  await expect(page).toHaveURL(/.*projects/);

  await page.getByRole("link", { name: "Processes" }).click();
  await expect(page).toHaveURL(/.*processes/);

  await page.getByRole("link", { name: "Recipes" }).click();
  await expect(page).toHaveURL(/.*recipes/);

  await page.getByRole("link", { name: "Parameters" }).click();
  await expect(page).toHaveURL(/.*parameters/);

  await page.getByRole("link", { name: "Tags" }).click();
  await expect(page).toHaveURL(/.*tags/);
});
