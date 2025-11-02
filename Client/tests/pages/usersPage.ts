import { Locator, Page } from "@playwright/test";
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
}
