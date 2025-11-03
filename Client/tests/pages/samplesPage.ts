import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class SamplesPage extends BasePage {
  readonly pageLink: Locator;
  readonly clearButton: Locator;
  readonly deleteSuccessText = "samples deleted succesfully";

  constructor(page: Page) {
    super(page);
    this.clearButton = page.getByRole("button", { name: "Clear" });
    this.pageLink = page.getByRole("link", { name: "Samples" });
  }

  async clearSearch() {
    await this.clearButton.click();
  }

  getSampleCell(name: string) {
    return this.page.getByRole("cell", { name });
  }

  async deleteRow(n: number) {
    const firstRow = await this.getRow(n);
    await firstRow.getByRole("button").nth(2).click();
    await this.confirmDeletion();
  }
}
