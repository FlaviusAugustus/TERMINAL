import { Page } from "@playwright/test";
import {
  parametersMock,
  projectsMock,
  recentSamplesMock,
  recipeDetailsMock,
  recipesAmountMock,
  recipesMock,
  samplesMock,
  tagsMock,
  userDetilsMock,
  usersMock,
} from "./mockedData";

export const currentProjects = [...projectsMock.projects];
export const currentSamples = [...samplesMock.samples];
export const currentTags = [...tagsMock.tags];
export const currentParameters = [...parametersMock.parameters];
export const currentUsers = [...usersMock.users];
export const currentRecipes = [...recipesMock.recipes];

export function resetProjects() {
  currentProjects.length = 0;
  currentProjects.push(...projectsMock.projects);
}

export function resetSamples() {
  currentSamples.length = 0;
  currentSamples.push(...samplesMock.samples);
}

export function resetTags() {
  currentTags.length = 0;
  currentTags.push(...tagsMock.tags);
}

export function resetParameters() {
  currentParameters.length = 0;
  currentParameters.push(...parametersMock.parameters);
}

export function resetUsers() {
  currentUsers.length = 0;
  currentUsers.push(...usersMock.users);
}

export function resetRecipes() {
  currentRecipes.length = 0;
  currentRecipes.push(...recipesMock.recipes);
}

export function setCurrentData<T>(dataArray: T[], newData: T[]) {
  dataArray.length = 0;
  dataArray.push(...newData);
}

export async function login(page: Page) {
  await page.goto("/login");
  await page
    .getByRole("textbox", { name: "Email:" })
    .fill("admin@terminal.com");
  await page.getByRole("textbox", { name: "Password:" }).fill("password");
  await page.getByRole("button", { name: "Sign in" }).click();
}

export async function mockCount(page: Page, apiPath: string, amount: number) {
  await page.route(apiPath, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(amount),
    });
  });
}

export async function mockSamples(page: Page, dataArray = currentSamples) {
  await page.route("**/api/samples?pageNumber=0&pageSize=10", async (route) => {
    if (route.request().method() === "GET") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ samples: dataArray }),
      });
      return;
    }
    return route.continue();
  });
}

export async function mockSamplesNextPage(
  page: Page,
  dataArray = currentSamples
) {
  await page.route("**/api/samples?pageNumber=1&pageSize=10", async (route) => {
    if (route.request().method() === "GET") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ samples: dataArray }),
      });
      return;
    }
    return route.continue();
  });
}

export async function mockSearch<T>(
  page: Page,
  apiPath: string,
  items: T[],
  property = "name",
  responseKey: string
) {
  await page.route(apiPath, async (route) => {
    if (route.request().method() === "GET") {
      const url = new URL(route.request().url());
      const searchPhrase =
        url.searchParams.get("searchPhrase")?.toLowerCase() ?? "";

      const filteredItems = items.filter((item) =>
        (item[property] ?? "").toLowerCase().includes(searchPhrase)
      );
      console.log("Filtered items:", filteredItems);

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          [responseKey]: filteredItems,
          totalPages: 1,
          totalElements: filteredItems.length,
        }),
      });
      return;
    }
    return route.continue();
  });
}

export async function mockEntityDetails<
  T extends { id: string; name?: string; isActive?: boolean },
  D,
>(
  page: Page,
  path: string,
  dataArray: T[],
  entityDetails: D,
  entityName: string
) {
  await page.route(path, async (route) => {
    const url = new URL(route.request().url());
    const id = url.pathname.split("/").pop();

    if (route.request().method() === "GET") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(entityDetails),
      });
      return;
    } else if (route.request().method() === "DELETE") {
      const index = dataArray.findIndex((item) => item.id === id);
      if (index !== -1) dataArray.splice(index, 1);
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ message: `${entityName} deleted successfully` }),
      });
      return;
    } else if (route.request().method() === "PATCH") {
      const requestBody = JSON.parse(route.request().postData() || "{}");
      const item = dataArray.find((item) => item.id === id);
      if (item?.name) {
        item.name = requestBody.name;
      }
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(item),
      });
      return;
    }
    return route.continue();
  });
}

export async function mockRecentSamples(page: Page) {
  await page.route("**/api/samples/recent?length=*", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(recentSamplesMock),
    });
  });
}

export async function mockProjectCreation(page: Page) {
  await page.route("**/api/projects", async (route) => {
    if (route.request().method() === "POST") {
      const requestBody = JSON.parse(route.request().postData() || "{}");

      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({
          id: "mocked-project-id-1234",
          name: requestBody.name,
          active: requestBody.active,
          message: "Mocked project successfully.",
        }),
      });
      return;
    }

    return route.continue();
  });
}

export async function mockProjects(page: Page) {
  await page.route("**/api/projects", async (route) => {
    if (route.request().method() === "GET") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(projectsMock),
      });
      return;
    }
    return route.continue();
  });
}

export async function mockProjectsAll(page: Page) {
  await page.route("**/api/projects/all**", async (route) => {
    if (route.request().method() === "GET") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ projects: currentProjects }),
      });
      return;
    }
    return route.continue();
  });
}

export async function mockProjectDeactivation(
  page: Page,
  id: string,
  dataArray = currentProjects
) {
  await page.route(`**/api/projects/${id}/deactivate`, async (route) => {
    if (route.request().method() === "POST") {
      const requestBody = JSON.parse(route.request().postData() || "{}");
      const item = dataArray.find((item) => item.id === id);
      if (item?.isActive !== undefined) {
        item.isActive = requestBody.isActive;
      }
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ item }),
      });
    }
    return route.continue();
  });
}

export async function mockTagCreation(page: Page) {
  await page.route("**/api/tags", async (route) => {
    if (route.request().method() === "POST") {
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({
          id: "mocked-tag-id-1234",
        }),
      });
      return;
    }

    return route.continue();
  });
}

export async function mockTags(page: Page) {
  await page.route("**/api/tags", async (route) => {
    if (route.request().method() === "GET") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(tagsMock),
      });
      return;
    }
    return route.continue();
  });
}

export async function mockAllTags(page: Page, dataArray = currentTags) {
  await page.route("**/api/tags/all**", async (route) => {
    if (route.request().method() === "GET") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ tags: dataArray }),
      });
      return;
    }
    return route.continue();
  });
}

export async function mockTagDeactivation(page: Page, id: string) {
  await page.route(`**/api/tags/${id}/deactivate`, async (route) => {
    if (route.request().method() === "POST") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ message: "Mocked success" }),
      });
    }
    return route.continue();
  });
}

export async function mockParameterCreation(page: Page) {
  await page.route("**/api/parameters/define/*", async (route) => {
    if (route.request().method() === "POST") {
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({
          id: {
            value: "mocked-tag-id-1234",
          },
        }),
      });
      return;
    }

    return route.continue();
  });
}

export async function mockParameters(
  page: Page,
  dataArray = currentParameters
) {
  await page.route("**/api/parameters", async (route) => {
    if (route.request().method() === "GET") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ parameters: dataArray }),
      });
      return;
    }
    return route.continue();
  });
}

export async function mockParameterDeactivation(page: Page, id: string) {
  await page.route(`**/api/parameters/${id}/deactivate`, async (route) => {
    if (route.request().method() === "POST") {
      const index = currentParameters.findIndex((item) => item.id === id);
      if (index !== -1) currentParameters.splice(index, 1);
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ message: "Mocked success" }),
      });
    }
    return route.continue();
  });
}

export async function mockRecipeCreation(page: Page) {
  await page.route("**/api/recipes", async (route) => {
    if (route.request().method() === "POST") {
      const requestBody = JSON.parse(route.request().postData() || "{}");

      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({
          id: "mocked-recipe-id-1234",
          name: requestBody.name,
          steps: requestBody.steps,
          message: "Mocked recipe successfully.",
        }),
      });
      return;
    }

    return route.continue();
  });
}

export async function mockSampleCreation(page: Page) {
  await page.route("**/api/samples", async (route) => {
    if (route.request().method() === "POST") {
      const requestBody = JSON.parse(route.request().postData() || "{}");

      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({
          projectId: requestBody.projectId,
          recipeId: requestBody.recipeId,
          steps: Array.isArray(requestBody.steps) ? requestBody.steps : [],
          tagIds: requestBody.tagIds,
          comment: requestBody.comment,
          saveAsRecipe: requestBody.saveAsRecipe,
          recipeName: requestBody.recipeName,
        }),
      });
      return;
    }

    return route.continue();
  });
}

export async function mockRecipes(
  page: Page,
  dataArray = currentRecipes,
  path = "**/api/recipes?pageSize=10&pageNumber=0&desc=true"
) {
  await page.route(path, async (route) => {
    if (route.request().method() === "GET") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ recipes: dataArray }),
      });
      return;
    }
    return route.continue();
  });
}

export async function mockRecipesAmount(page: Page) {
  await page.route("**/api/recipes/amount", async (route) => {
    if (route.request().method() === "GET") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(recipesAmountMock),
      });
      return;
    }
    return route.continue();
  });
}

export async function mockRecipeDetails(page: Page, id: string) {
  await page.route(`**/api/recipes/${id}/details`, async (route) => {
    if (route.request().method() === "GET") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(recipeDetailsMock),
      });
      return;
    }
    return route.continue();
  });
}

export async function mockUsers(page: Page) {
  await page.route(
    "**/api/users?pageNumber=0&pageSize=10&desc=true",
    async (route) => {
      if (route.request().method() === "GET") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(usersMock),
        });
        return;
      }
      return route.continue();
    }
  );
}

export async function mockUserDetails(page: Page, id: string) {
  await page.route(`**/api/users/${id}`, async (route) => {
    if (route.request().method() === "GET") {
      const user = usersMock.users.find((u) => u.id === id) || userDetilsMock;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(user),
      });
      return;
    } else if (route.request().method() === "DELETE") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ message: "User deleted successfully" }),
      });
      return;
    }
    return route.continue();
  });
}

export async function mockUserEmailModification(page: Page, id: string) {
  await page.route(`**/api/users/${id}/email`, async (route) => {
    if (route.request().method() === "PATCH") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ message: "Email updated successfully" }),
      });
      return;
    }
    return route.continue();
  });
}

export async function mockUserRoleModification(page: Page, id: string) {
  await page.route(`**/api/users/${id}/role`, async (route) => {
    if (route.request().method() === "PATCH") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ message: "Role updated successfully" }),
      });
      return;
    }
    return route.continue();
  });
}
