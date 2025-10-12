import { BaseAddNewPage } from "./baseAddNewPage";

export class NewParameterPage extends BaseAddNewPage {
  entityName = "Parameter";
  addButtonName = "Add Parameter";
  successMessage = "Parameter added successfully";
  failureMessage = "Failed adding parameter";

  async fillUnit(unit: string) {
    await this.page.getByRole("textbox", { name: "Unit:" }).fill(unit);
  }

  async fillType(type: string) {
    await this.page.getByRole('combobox', { name: 'Type:' }).click();
    await this.page.getByRole('option', { name: type }).click();
  }
}
