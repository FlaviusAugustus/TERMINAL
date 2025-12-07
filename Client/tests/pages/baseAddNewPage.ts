import { expect, Page } from "@playwright/test";

export abstract class BaseAddNewPage {
  constructor(protected page: Page) {}
  abstract entityName: string;
  abstract addButtonName: string;
  abstract successMessage: string;
  abstract failureMessage: string;

  get expectedUrl() {
    return new RegExp(`.*new-${this.entityName.toLowerCase()}`);
  }

  async openAddForm() {
    await this.page
      .getByRole("button", { name: "Add new", exact: true })
      .click();
    await expect(
      this.page.getByRole("link", { name: this.entityName, exact: true })
    ).toBeVisible();
    await this.page
      .getByRole("link", { name: this.entityName, exact: true })
      .click();

    await expect(this.page).toHaveURL(this.expectedUrl);
    await expect(
      this.page.getByText(`Add new ${this.entityName}`).nth(1)
    ).toBeVisible();
  }

  async fillName(name: string) {
    await this.page.getByRole("textbox", { name: "Name:" }).fill(name);
  }

  async submit() {
    await this.page.getByRole("button", { name: this.addButtonName }).click();
  }

  async expectSuccessToast() {
    await expect(this.page.getByText(this.successMessage)).toBeVisible();
  }

  async expectFailureToast() {
    await expect(this.page.getByText(this.failureMessage)).toBeVisible();
  }

  async expectValidationError(message: string) {
    await expect(this.page.getByText(message)).toBeVisible();
  }
}
