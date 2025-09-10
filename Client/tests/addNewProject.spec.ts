import { expect, test } from "@playwright/test";

async function login(page) {
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

test("should add new project successfully", async ({ page }) => {
  await page.getByRole("button", { name: "Add new", exact: true }).click();
  await expect(
    page.getByRole("link", { name: "Project", exact: true })
  ).toBeVisible();
  await page.getByRole("link", { name: "Project", exact: true }).click();
  await expect(page).toHaveURL(/.*new-project/);
  await expect(page.getByText("Add new project").nth(1)).toBeVisible();
  await page.getByRole("textbox", { name: "Name:" }).fill("New-Project-Test"); // Use a unique name to avoid conflicts
  await page.getByRole("button", { name: "Add Project" }).click();
  await expect(page.getByText("Project added succesfully")).toBeVisible();
  await page.goto("/projects");
  await expect(
    page.getByRole("cell", { name: "New-Project-Test" })
  ).toBeVisible();
});

test("should not add project bacause of existing name", async ({ page }) => {
  await page.getByRole("button", { name: "Add new", exact: true }).click();
  await expect(
    page.getByRole("link", { name: "Project", exact: true })
  ).toBeVisible();
  await page.getByRole("link", { name: "Project", exact: true }).click();
  await expect(page).toHaveURL(/.*new-project/);
  await expect(page.getByText("Add new project").nth(1)).toBeVisible();
  await page.getByRole("textbox", { name: "Name:" }).fill("New-Project-Test");
  await page.getByRole("button", { name: "Add Project" }).click();
  await expect(page.getByText("Failed adding project")).toBeVisible();
});

test("should trim name while adding the project", async ({ page }) => {
  await page.getByRole("button", { name: "Add new", exact: true }).click();
  await expect(
    page.getByRole("link", { name: "Project", exact: true })
  ).toBeVisible();
  await page.getByRole("link", { name: "Project", exact: true }).click();
  await expect(page).toHaveURL(/.*new-project/);
  await expect(page.getByText("Add new project").nth(1)).toBeVisible();
  await page
    .getByRole("textbox", { name: "Name:" })
    .fill(" Trim-Project-Test ");
  await page.getByRole("button", { name: "Add Project" }).click();
  await expect(page.getByText("Project added succesfully")).toBeVisible();
  await page.goto("/projects");
  await expect(
    page.getByRole("cell", { name: "Trim-Project-Test" })
  ).toBeVisible();
});

test("should show validation error for empty project name", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Add new", exact: true }).click();
  await expect(
    page.getByRole("link", { name: "Project", exact: true })
  ).toBeVisible();
  await page.getByRole("link", { name: "Project", exact: true }).click();
  await expect(page).toHaveURL(/.*new-project/);
  await expect(page.getByText("Add new project").nth(1)).toBeVisible();
  await page.getByRole("textbox", { name: "Name:" }).fill("");
  await page.getByRole("button", { name: "Add Project" }).click();
  await expect(page.getByText("is required")).toBeVisible();
});

test("should show validation error for invalid project name", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Add new", exact: true }).click();
  await expect(
    page.getByRole("link", { name: "Project", exact: true })
  ).toBeVisible();
  await page.getByRole("link", { name: "Project", exact: true }).click();
  await expect(page).toHaveURL(/.*new-project/);
  await expect(page.getByText("Add new project").nth(1)).toBeVisible();
  await page.getByRole("textbox", { name: "Name:" }).fill(" ");
  await page.getByRole("button", { name: "Add Project" }).click();
  await expect(
    page.getByText("name must be at least 3 characters long")
  ).toBeVisible();
});
