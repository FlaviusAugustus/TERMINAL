import { BaseAddNewPage } from "./baseAddNewPage";

export class NewTagPage extends BaseAddNewPage {
  entityName = "Tag";
  addButtonName = "Add Tag";
  successMessage = "Tag added succesfully";
  failureMessage = "Failed adding tag";
}
