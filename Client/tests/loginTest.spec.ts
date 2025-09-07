import { test, expect } from '@playwright/test';

test('should login with valid credentials', async ({ page  }) => {
  await page.goto('/login');
  await page.getByRole('textbox', { name: 'Email:' }).fill('admin@terminal.com');
  await page.getByRole('textbox', { name: 'Password:' }).fill('1qaz@WSX');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL('https://localhost:5173/');
  await expect(page.getByText('Login successful')).toBeVisible();
});

test('should show error with invalid credentials', async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('textbox', { name: 'Email:' }).fill('admin@terminal.com');
  await page.getByRole('textbox', { name: 'Password:' }).fill('wrongpassword');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByText('Login failed')).toBeVisible();
});

test('should show validation errors for empty fields', async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('textbox', { name: 'Email:' }).click();
  await page.getByRole('textbox', { name: 'Password:' }).click();
  await expect(page.getByText(/email is required/i)).toBeVisible();
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByText(/password is required/i)).toBeVisible();
});

test('should show invalid email format error', async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('textbox', { name: 'Email:' }).fill('invalid-email');
  await page.getByRole('textbox', { name: 'Password:' }).click();
  await expect(page.getByText(/please enter a valid email/i)).toBeVisible();
});

test('should redirect to signin page when entering the page', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL('https://localhost:5173/login');
});