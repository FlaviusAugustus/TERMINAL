import { Page } from "@playwright/test";
import { DEFAULT_USER_EMAIL, DEFAULT_USER_PASSWORD } from "../constants";

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/login");
  }

  async login() {
    await this.page.getByRole("textbox", { name: "Email:" }).fill(DEFAULT_USER_EMAIL);
    await this.page.getByRole("textbox", { name: "Password:" }).fill(DEFAULT_USER_PASSWORD);
    await this.page.getByRole("button", { name: "Sign in" }).click();
  }
}
