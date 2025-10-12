import { expect } from "@playwright/test";
import { BaseAddNewPageDragable } from "./baseAddNewPageDragable";

export class NewSamplePage extends BaseAddNewPageDragable {
    entityName = 'Sample';
    sourceLocator = 'div:nth-child(3) > .flex.overflow-auto.h-full.px-2 > .flex.flex-col.gap-2.w-80 > .flex.flex-col.flex-grow > .flex.flex-col > div > .border > .bg-gray-100 > .cursor-grab';
    destinationLocator = 'div:nth-child(3) > .flex.overflow-auto.h-full.px-2 > .flex.flex-col.border.border-gray-200.rounded-md.bg-white > .bg-gray-100 > .flex.flex-col > .flex-1 > .h-full';
    successMessage = 'Sample added successfully';

  async submit() {
    await this.page.locator('div:nth-child(3) > .flex.overflow-auto.h-full.px-2 > .flex.flex-col.gap-2.w-80 > .hidden > .flex.border.gap-2 > .flex.items-center.justify-center.p-2.border.bg-white.border-gray-200.rounded.hover\\:bg-gray-50.hover\\:border-green-300').click();
    await this.page.getByRole('combobox', { name: 'Project:' }).click();
    await this.page.getByRole('option', { name: 'Alpha' }).click();
    await this.page.getByRole('checkbox', { name: 'Save as recipe:' }).click();
    await this.page.getByRole('textbox', { name: 'Recipe Name:' }).fill('first-recipe');
    await this.page.getByRole('combobox', { name: 'Tags:' }).click();
    await this.page.getByRole('option', { name: 'popular-sample' }).click();
    await this.page.getByText('Project:Save as recipe:Recipe').click();
    await this.page.getByRole('textbox', { name: 'Comment' }).fill('This is comment');
    await this.page.getByRole('button', { name: 'Add sample' }).click();
    await expect(this.page.getByText(this.successMessage)).toBeVisible();
  }
}