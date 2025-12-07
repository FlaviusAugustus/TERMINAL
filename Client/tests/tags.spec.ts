import { expect, test } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";
import { TagsPage } from "./pages/tagPage";
import {
  currentTags,
  mockAllTags,
  mockEntityDetails,
  mockSearch,
  mockTagDeactivation,
  resetTags,
  setCurrentData,
} from "./helpers/mocks";
import { MOCKED_TAG_ID, TAG_DETAILS_PATH, TAG_ENTITY } from "./constants";
import { tagDetailsMock, tagMock, tagsMock } from "./helpers/mockedData";

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login();
  resetTags();
});

test("renders table with correct columns", async ({ page }) => {
  const tags = new TagsPage(page);
  await tags.goto();
  await expect(page.getByRole("cell", { name: "Name" })).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Actions" }).locator("div")
  ).toBeVisible();
});

test("searches for existing tag", async ({ page }) => {
  await mockAllTags(page);
  await mockSearch(page, "**/api/tags/search**", tagsMock.tags, "name", "tags");
  const searchedParam = "popular-sample";
  const tags = new TagsPage(page);
  await tags.goto();
  await tags.searchFor(searchedParam);
  await expect(tags.getTagCell(searchedParam)).toBeVisible();
});

// Uncomment when search functionality is fixed

// test("shows nothing when no results found", async ({ page }) => {
//   await mockAllTags(page);
//   await mockSearch(page, "**/api/tags/search**", tagsMock.tags, "name", "tags");
//   const tags = new TagsPage(page);
//   await tags.goto();
//   await tags.searchFor("NonExistingTag123");
//   await tags.expectNoResults();
// });

test("redirects to Add New Tag page", async ({ page }) => {
  const tags = new TagsPage(page);
  await tags.goto();
  await tags.clickAddNew();
  await expect(page).toHaveURL(/.*new-Tag/);
  await expect(page.getByText("Add new tag").nth(1)).toBeVisible();
});

test("shows tag details", async ({ page }) => {
  await mockAllTags(page);
  await mockEntityDetails(
    page,
    TAG_DETAILS_PATH,
    currentTags,
    tagDetailsMock,
    TAG_ENTITY
  );

  const tags = new TagsPage(page);
  await tags.goto();
  const firstRow = await tags.getRow(1);
  await firstRow.getByRole("button").nth(0).click();
  await expect(page.getByText("Tag details")).toBeVisible();
  await expect(page.getByText("name", { exact: true })).toBeVisible();
  await expect(page.getByText("is Active")).toBeVisible();
});

test("edits tag name", async ({ page }) => {
  await mockAllTags(page);
  await mockEntityDetails(
    page,
    TAG_DETAILS_PATH,
    currentTags,
    tagDetailsMock,
    TAG_ENTITY
  );

  const tags = new TagsPage(page);
  await tags.goto();
  const firstRow = await tags.getRow(1);
  await firstRow.getByRole("button").nth(1).click();
  await page.getByRole("textbox", { name: "Name:" }).click();
  await page
    .getByRole("textbox", { name: "Name:" })
    .fill("popular-sample-modified");
  await page.getByRole("button", { name: "Submit changes" }).click();
  await expect(firstRow.getByText("popular-sample-modified")).toBeVisible();
});

test("deactivates tag using switch", async ({ page }) => {
  await mockAllTags(page);
  await mockEntityDetails(
    page,
    TAG_DETAILS_PATH,
    currentTags,
    tagDetailsMock,
    TAG_ENTITY
  );
  await mockTagDeactivation(page, MOCKED_TAG_ID);

  const tags = new TagsPage(page);
  await tags.goto();
  const firstRow = await tags.getRow(1);
  await firstRow.getByRole("button").nth(1).click();
  await page.getByRole("switch", { name: "Status" }).click();
  await page.getByRole("button", { name: "Submit changes" }).click();
  await firstRow.getByRole("button").nth(0).click();
  await expect(page.locator('tr').filter({ hasText: 'popular-sampleNot Active' }).locator('span')).toBeVisible();
});

test("delete tag using X button", async ({ page }) => {
  await mockAllTags(page);
  await mockEntityDetails(
    page,
    TAG_DETAILS_PATH,
    currentTags,
    tagDetailsMock,
    TAG_ENTITY
  );

  const tags = new TagsPage(page);
  await tags.goto();
  await tags.deleteRow(1);
});

test("deletes selected tag using checkbox", async ({ page }) => {
  await mockAllTags(page);
  await mockEntityDetails(
    page,
    TAG_DETAILS_PATH,
    currentTags,
    tagDetailsMock,
    TAG_ENTITY
  );

  const tags = new TagsPage(page);
  await tags.goto();
  const row = await tags.getRow(1);
  const firstRowContent = (await row.textContent())?.trim() ?? "";
  await tags.deleteUsingCheckbox(1);
  await expect(tags.page.getByText(firstRowContent).nth(1)).not.toBeVisible();
});

test("deletes all tags using checkbox", async ({ page }) => {
  setCurrentData(currentTags, tagMock.tags);
  await mockAllTags(page);
  await mockEntityDetails(
    page,
    TAG_DETAILS_PATH,
    currentTags,
    tagDetailsMock,
    TAG_ENTITY
  );

  const tags = new TagsPage(page);
  await tags.goto();
  await tags.deleteAllRows();
  await tags.checkDeletionSuccess();
});
