import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class ProjectsPage extends BasePage {
  readonly pageLink: Locator;
  readonly clearButton: Locator;
  readonly deleteSuccessText = "Deletion successful";

  constructor(page: Page) {
    super(page);
    this.clearButton = page.getByRole("button", { name: "Clear" });
    this.pageLink = page.getByRole("link", { name: "Projects" });
  }

  async clearSearch() {
    await this.clearButton.click();
  }

  getProjectCell(name: string) {
    return this.page.getByRole("cell", { name });
  }

  async closeEditModal() {
    await this.page
      .getByRole("heading", { name: "Edit project" })
      .locator("svg")
      .click();
  }

  async deleteRow(n: number) {
    const row = await this.getRow(n);
    await row.getByRole("button").nth(1).click();
    await this.confirmDeletion();
  }
}
