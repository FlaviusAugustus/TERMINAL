import { BaseAddNewPage } from "./baseAddNewPage";

export class NewProjectPage extends BaseAddNewPage {
  entityName = "Project";
  addButtonName = "Add Project";
  successMessage = "Project added succesfully";
  failureMessage = "Failed adding project";
}
