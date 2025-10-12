import { expect } from "@playwright/test";
import { BaseAddNewPageDragable } from "./baseAddNewPageDragable";

export class NewRecipePage extends BaseAddNewPageDragable {
  entityName = "Recipe";
  sourceLocator = `div:nth-child(3) > .flex.overflow-auto.h-full > .flex.flex-col.gap-2.w-80 > .flex.flex-col.flex-grow > .flex.flex-col > div > .border > .bg-gray-100 > .cursor-grab`;
  destinationLocator =
    "div:nth-child(3) > .flex.overflow-auto.h-full > .flex.flex-col.border.border-gray-200.rounded-md.bg-white > .bg-gray-100 > .flex.flex-col > .flex-1 > .h-full";
  successMessage = "Recipe added successfully";

  async submit() {
    await this.page
      .locator(
        "div:nth-child(3) > .flex.overflow-auto.h-full > .flex.flex-col.gap-2.w-80 > .hidden > .flex.border.gap-2 > .flex.items-center.justify-center.p-2.border.bg-white.border-gray-200.rounded.hover\\:bg-gray-50.hover\\:border-green-300"
      )
      .click();
    await this.page.getByRole("textbox", { name: "Name:" }).fill("A");
    await this.page.getByRole("button", { name: "Add recipe" }).click();
    await expect(
      this.page.getByText("must be at least 3 characters long")
    ).toBeVisible();
    await this.page.getByRole("textbox", { name: "Name:" }).fill("test");
    await this.page.getByRole("button", { name: "Add recipe" }).click();
    await expect(this.page.getByText(this.successMessage)).toBeVisible();
  }
}
