import { Page, expect } from "@playwright/test";

export class DashboardPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/dashboard");
  }

  async clickBrowseAll(sectionIndex: number) {
    await this.page
      .getByRole("button", { name: "Browse All" })
      .nth(sectionIndex)
      .click();
  }

  async clickAddNew(sectionIndex: number) {
    await this.page
      .getByRole("button", { name: "Add New" })
      .nth(sectionIndex)
      .click();
  }

  async verifyCountCard(
    title: string,
    expectedValue: number,
    columnIndex: number
  ) {
    await expect(this.page.getByText(title).nth(1)).toBeVisible();
    await expect(
      this.page
        .getByText(String(expectedValue), { exact: true })
        .nth(columnIndex)
    ).toBeVisible();
  }

  async expectNavigationTo(url: RegExp, header: string, index: number = 0) {
    await expect(this.page).toHaveURL(url);

    const headerLocator = this.page.getByText(header);

    if (index === 0) {
      await expect(headerLocator.first()).toBeVisible();
    } else {
      await expect(headerLocator.nth(index)).toBeVisible();
    }
  }

  async verifyRecentSamples(recentSamples: { code: string }[]) {
    await expect(
      this.page.getByRole("paragraph").filter({ hasText: "Recent Samples" })
    ).toBeVisible();
    for (const sample of recentSamples) {
      await expect(
        this.page.getByRole("cell", { name: sample.code }).first()
      ).toBeVisible();
    }
  }
}
