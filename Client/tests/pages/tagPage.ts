import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class TagsPage extends BasePage{
  readonly pageLink: Locator;
  readonly clearButton: Locator;
  readonly deleteSuccessText = "Deletion successful";

  constructor(page: Page) {
    super(page);
    this.clearButton = page.getByRole("button", { name: "Clear" });
    this.pageLink = page.getByRole("link", { name: "Tags" });
  }

  async clearSearch() {
    await this.clearButton.click();
  }

  getTagCell(name: string) {
    return this.page.getByRole("cell", { name });
  }

  async deleteRow(n: number) {
    const row = await this.getRow(n);
    await row.getByRole("button").nth(2).click();
    await expect(this.page.getByText(this.deleteSuccessText)).toBeVisible();
  }
}
