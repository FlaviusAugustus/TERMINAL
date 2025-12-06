import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class ParametersPage extends BasePage {
  readonly pageLink: Locator;
  readonly clearButton: Locator;
  readonly deleteSuccessText = "Deletion successful";

  constructor(page: Page) {
    super(page);
    this.clearButton = page.getByRole("button", { name: "Clear" });
    this.pageLink = page.getByRole("link", { name: "Parameters" });
  }

  async clearSearch() {
    await this.clearButton.click();
  }

  getProjectCell(name: string) {
    return this.page.getByRole("cell", { name });
  }

  async checkRowStatusByText(rowText: string, expectedStatus: string) {
    const row = this.page.getByRole("row").filter({ hasText: rowText }).first();
    const statusSpan = row.locator("span").first();
    await expect(statusSpan).toHaveText(expectedStatus);
  }
}
