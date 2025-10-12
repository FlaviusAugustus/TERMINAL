import { Page, Locator, expect } from "@playwright/test";

export abstract class BasePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly addNewButton: Locator;
  abstract pageLink: Locator;
  abstract deleteSuccessText: string;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByRole("textbox", { name: "Search" });
    this.addNewButton = page.getByRole("link", { name: "Add new" });
  }

  async goto() {
    await this.pageLink.click();
  }

  async searchFor(name: string) {
    await this.searchInput.fill(name);
    await this.searchInput.press("Enter");
  }

  async clickAddNew() {
    await this.addNewButton.getByRole("button").click();
  }

  async getRows() {
    return this.page.getByRole("row");
  }

  async getRow(n: number) {
    return this.page.getByRole("row").nth(n);
  }

  async expectNoResults() {
    await expect(this.page.getByRole("row")).toHaveCount(1);
  }

  async expectSomeResults() {
    const cellCount = await this.page.getByRole("cell").count();
    expect(cellCount).toBeGreaterThan(0);
  }

  async confirmDeletion() {
    await this.page.getByRole('textbox', { name: 'Confirmation:' }).fill('delete');
    await this.page.getByRole('button', { name: 'Delete' }).click();
  }

  async checkIfToastVisible() {
    await expect(this.page.getByText(this.deleteSuccessText)).toBeVisible();
  }

  async checkDeletionSuccess() {
    await expect(this.page.getByRole("row")).toHaveCount(1);
  }

  async deleteRow(n: number) {
    const row = await this.getRow(n);
    await row.getByRole("button").nth(1).click();
  }

  async deleteUsingCheckbox(n: number) {
    const row = await this.getRow(n);
    await row.getByRole("checkbox").click();
    await this.page.getByRole('button', { name: /delete selected/i }).click();
  }

  async deleteAllRows() {
    await this.page.getByRole("row").nth(0).getByRole("checkbox").click();
    await this.page.getByRole('button', { name: /delete selected/i }).click();
  }
}
