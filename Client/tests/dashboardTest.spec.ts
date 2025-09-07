import { test, expect } from '@playwright/test';

async function login(page) {
  await page.goto('/login');
  await page.getByRole('textbox', { name: 'Email:' }).fill('admin@terminal.com');
  await page.getByRole('textbox', { name: 'Password:' }).fill('1qaz@WSX');
  await page.getByRole('button', { name: 'Sign in' }).click();
}

test.beforeEach(async ({ page }) => {
  await login(page);
});

test('should display correct number of projects', async ({ page }) => {
  // Mock the API response for /api/projects/amount
  await page.route('**/api/projects/amount', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(7)
    });
  });

  await expect(page.getByText('Total projects').nth(1)).toBeVisible();
  await expect(page.getByText('7', { exact: true }).nth(1)).toBeVisible();
});

test('should display correct number of samples', async ({ page }) => {
  // Mock the API response for /api/samples/amount
  await page.route('**/api/samples/amount', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(15)
    });
  });

  await expect(page.getByText('Total samples').nth(1)).toBeVisible();
  await expect(page.getByText('15', { exact: true }).nth(1)).toBeVisible();
});

test('should display correct number of recipes', async ({ page }) => {
  // Mock the API response for /api/recipes/amount
  await page.route('**/api/recipes/amount', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(5)
    });
  });

  await expect(page.getByText('Total recipes').nth(1)).toBeVisible();
  await expect(page.getByText('5', { exact: true }).nth(1)).toBeVisible();
});

test('should display correct number of users', async ({ page }) => {
  // Mock the API response for /api/users/amount
  await page.route('**/api/users/amount', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(12)
    });
  });

  await expect(page.getByText('Total users').nth(1)).toBeVisible();
  await expect(page.getByText('12', { exact: true }).nth(1)).toBeVisible();
});

test('should redirect to Projects page on clicking Browse All', async ({ page }) => {
  await page.getByRole('button', { name: 'Browse All' }).first().click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByText('Projects').first()).toBeVisible();
});

test('should redirect to Add new project page on clicking Add New', async ({ page }) => {
  await page.getByRole('button', { name: 'Add New' }).first().click();
  await expect(page).toHaveURL(/\/new-project$/);
  await expect(page.getByText('Add new project').first()).toBeVisible();
});

test('should redirect to Samples page on clicking Browse All under Samples', async ({ page }) => {
  await page.getByRole('button', { name: 'Browse All' }).nth(1).click();
  await expect(page).toHaveURL(/\/samples$/);
  await expect(page.getByText('Samples').first()).toBeVisible();
});

test('should redirect to Add new sample page on clicking Add New under Samples', async ({ page }) => {
  await page.getByRole('button', { name: 'Add New' }).nth(1).click();
  await expect(page).toHaveURL(/\/new-sample$/);
  await expect(page.getByText('Add new sample').first()).toBeVisible();
});

test('should redirect to Recipes page on clicking Browse All under Recipes', async ({ page }) => {
  await page.getByRole('button', { name: 'Browse All' }).nth(2).click();
  await expect(page).toHaveURL(/\/recipes$/);
  await expect(page.getByText('Recipes').first()).toBeVisible();
});

test('should redirect to Add new recipe page on clicking Add New under Recipes', async ({ page }) => {
  await page.getByRole('button', { name: 'Add New' }).nth(2).click();
  await expect(page).toHaveURL(/\/new-recipe$/);
  await expect(page.getByText('Add new recipe').first()).toBeVisible();
});

test('should redirect to Users page on clicking Browse All under Users', async ({ page }) => {
  await page.getByRole('button', { name: 'Browse All' }).nth(3).click();
  await expect(page).toHaveURL(/\/users$/);
  await expect(page.getByText('Users').first()).toBeVisible();
});

const recentSamplesMock = {
  recentSamples: [
    { id: "edd5c7be-70db-4efe-a789-2750d9d27a5b", code: "AX45", project: "Nitro", createdAtUtc: "2025-05-16T10:04:00.0687470Z", comment: "First sample!" },
    { id: "e774a026-18e9-4f38-9e41-8f524a5bf43b", code: "AX44", project: "Nitro", createdAtUtc: "2025-05-16T10:04:00.0562750Z", comment: "Second sample!" }
  ]
};

test('should display recent samples correctly', async ({ page }) => {
  await page.route('**/api/samples/recent', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(recentSamplesMock)
    });
  });

  await expect(page.getByRole('paragraph').filter({ hasText: 'Recent Samples' })).toBeVisible();
  
  // Verify that each recent sample is displayed
  for (const sample of recentSamplesMock.recentSamples) {
    await expect(page.getByRole('cell', { name: sample.code }).first()).toBeVisible();
  }
});

// To DO: Add tests to Pinned Receipes once the feature is implemented


