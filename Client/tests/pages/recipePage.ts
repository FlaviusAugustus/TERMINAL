import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class RecipePage extends BasePage{
    readonly pageLink: Locator;
    readonly deleteSuccessText = "Recipe deleted succesfully";

    constructor(page: Page) {
        super(page);
        this.pageLink = page.getByRole("link", { name: "Recipes" });
    }

    async deleteRow(n: number) {
      const row = await this.getRow(n);
      await row.getByRole("button").nth(2).click();
      await expect(this.page.getByText(this.deleteSuccessText)).toBeVisible();
    }

    async checkIfToastVisibleForMultipleDeletions() {
      await expect(this.page.getByText("Recipes deleted succesfully")).toBeVisible();
    }
}