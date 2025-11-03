import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class UsersPage extends BasePage {
  readonly pageLink: Locator;
  readonly clearButton: Locator;
  readonly deleteSuccessText = "User deleted successfully";

  constructor(page: Page) {
    super(page);
    this.clearButton = page.getByRole("button", { name: "Clear" });
    this.pageLink = page.getByRole("link", { name: "Browse" });
  }

  async clearSearch() {
    await this.clearButton.click();
  }

  async deleteRow(n: number) {
    const row = await this.getRow(n);
    await row.getByRole("button").nth(1).click();
  }

  async deleteUsingCheckbox(n: number) {
    const row = await this.getRow(n);
    await row.getByRole("checkbox").click();
    await this.page.getByRole("button", { name: /delete selected/i }).click();

  }

  async deleteAllRows() {
    await this.page.getByRole("row").nth(0).getByRole("checkbox").click();
    await this.page.getByRole("button", { name: /delete selected/i }).click();
    
  }
}
