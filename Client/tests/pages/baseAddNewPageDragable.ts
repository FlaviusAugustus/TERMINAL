import { Page, Locator, expect } from "@playwright/test";

export abstract class BaseAddNewPageDragable {
  constructor(protected page: Page) {}
  abstract entityName: string;
  abstract sourceLocator: string;
  abstract destinationLocator: string;
  abstract successMessage: string;

  async openAddForm() {
    await this.page.getByRole("button", { name: "Add new", exact: true }).click();
    await expect(this.page.getByRole("link", { name: this.entityName, exact: true })).toBeVisible();
    await this.page.getByRole("link", { name: this.entityName, exact: true }).click();
  }

  async dragAndDropStep(sourceIndex: number) {
    const source = this.page.locator(this.sourceLocator).nth(sourceIndex);
    const destination = this.page.locator(this.destinationLocator);

    const box = await source.boundingBox();
    const target = await destination.boundingBox();

    if (box && target) {
      await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await this.page.mouse.down();
      await this.page.waitForTimeout(200);
      await this.page.mouse.move(target.x + target.width / 2, target.y + target.height / 2, { steps: 10 });
      await this.page.mouse.up();
    }
  }

  async fillFirstStepValue(selector: string, value: string) {
    await this.page.locator(selector).fill(value);
  }

  async fillStepValue(selector: string, value: string) {
    await this.page.locator('div').filter({hasText: selector}).getByRole('textbox').fill(value);
  }

  async fillComment(comment: string) {
    await this.page.getByRole("textbox", { name: "Comment" }).fill(comment);
  }

  async fillName(name: string) {
    await this.page.getByRole("textbox", { name: "Name:" }).fill(name);
  }

  async addStep() {
    await this.page.getByRole('tablist').getByRole('button').click();
  }

  async reset() {
    await this.page.locator('div:nth-child(3) > .flex.overflow-auto.h-full.px-2 > .flex.flex-col.gap-2.w-80 > .hidden > .flex.border.gap-2 > .flex.items-center.justify-center.p-2.border.bg-white.border-gray-200.rounded.hover\\:bg-gray-50.hover\\:border-red-300').click();
    await expect(this.page.getByText('Step 1')).not.toBeVisible();
  }
}