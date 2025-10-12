import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";
import { UsersPage } from "./pages/usersPage";
import { MOCKED_USER_ID, USER_DETAILS_PATH, USER_ENTITY } from "./constants";
import {
  mockUserEmailModification,
  mockUserRoleModification,
  mockUsers,
  mockUserDetails,
  mockEntityDetails,
  resetUsers,
  currentUsers,
  setCurrentData,
} from "./helpers/mocks";
import { userDetilsMock, userMock } from "./helpers/mockedData";

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login();
  resetUsers();
});

test("renders table with correct columns", async ({ page }) => {
  const users = new UsersPage(page);
  await users.goto();
  await expect(page.getByRole("cell", { name: "Email" })).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Role" }).locator("div")
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Actions" }).locator("div")
  ).toBeVisible();
});

// uncomment when the Invite User page is implemented
// test("redirects to Invite User page", async ({ page }) => {
//   const users = new UsersPage(page);
//   await users.goto();
//   await users.clickAddNew();
//   await expect(page).toHaveURL(/.*invite-user/);
//   await expect(page.getByText("Invite new user").nth(1)).toBeVisible();
// });

test("validates email input while editing user", async ({ page }) => {
  await mockUsers(page);
  await mockEntityDetails(
    page,
    USER_DETAILS_PATH,
    currentUsers,
    userDetilsMock,
    USER_ENTITY
  );

  const users = new UsersPage(page);
  await users.goto();
  const secondRow = await users.getRow(2);
  await secondRow.getByRole("button").nth(0).click();
  await expect(page.getByText("Edit user")).toBeVisible();
  await page.getByRole("textbox", { name: "Email:" }).fill("inavlid-email");
  await page.getByRole("button", { name: "Submit changes" }).click();
  await expect(page.getByText("please enter a valid email")).toBeVisible();
  await expect(page.getByText("Failed to update email")).toBeVisible();
});

test("restores user details while updating", async ({ page }) => {
  await mockUsers(page);
  await mockEntityDetails(
    page,
    USER_DETAILS_PATH,
    currentUsers,
    userDetilsMock,
    USER_ENTITY
  );

  const users = new UsersPage(page);
  await users.goto();
  const secondRow = await users.getRow(2);
  await secondRow.getByRole("button").nth(0).click();
  await expect(page.getByText("Edit user")).toBeVisible();
  const emailField = page.getByRole("textbox", { name: "Email:" });
  const originalEmail = await emailField.inputValue();
  await emailField.fill("new-value");
  await page
    .getByRole("dialog", { name: "Edit user" })
    .getByRole("button")
    .nth(2)
    .click();
  await expect(emailField).toHaveValue(originalEmail);
});

test("edits user email and role", async ({ page }) => {
  await mockUsers(page);
  await mockEntityDetails(
    page,
    USER_DETAILS_PATH,
    currentUsers,
    userDetilsMock,
    USER_ENTITY
  );
  await mockUserEmailModification(page, MOCKED_USER_ID);
  await mockUserRoleModification(page, MOCKED_USER_ID);

  const users = new UsersPage(page);
  await users.goto();
  const secondRow = await users.getRow(2);
  await secondRow.getByRole("button").nth(0).click();
  await expect(page.getByText("Edit user")).toBeVisible();
  await page.getByRole("textbox", { name: "Email:" }).fill("modified@test.com");
  await page.getByRole("button", { name: "Submit changes" }).click();
  await expect(page.getByText("Email updated successfully")).toBeVisible();
  await page.getByRole("combobox", { name: "Role:" }).click();
  await page.getByRole("option", { name: "Guest" }).click();
  await page.getByRole("button", { name: "Submit changes" }).click();
  await expect(page.getByText("Role updated successfully")).toBeVisible();
});

test("deletes user using X button", async ({ page }) => {
  await mockUsers(page);
  await mockEntityDetails(
    page,
    USER_DETAILS_PATH,
    currentUsers,
    userDetilsMock,
    USER_ENTITY
  );

  const users = new UsersPage(page);
  await users.goto();
  await users.deleteRow(2);
});

test("deletes selected user using checkbox", async ({ page }) => {
  await mockUsers(page);
  await mockEntityDetails(
    page,
    USER_DETAILS_PATH,
    currentUsers,
    userDetilsMock,
    USER_ENTITY
  );

  const users = new UsersPage(page);
  await users.goto();
  await users.deleteUsingCheckbox(2);
  await users.checkIfToastVisible();
});

test("deletes all projects using checkbox", async ({ page }) => {
  setCurrentData(currentUsers, userMock.users);
  await mockUsers(page);
  await mockEntityDetails(
    page,
    USER_DETAILS_PATH,
    currentUsers,
    userDetilsMock,
    USER_ENTITY
  );

  const users = new UsersPage(page);
  await users.goto();
  await users.deleteAllRows();
});
