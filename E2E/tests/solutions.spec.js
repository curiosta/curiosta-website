import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://curiosta.com/');
  await page.getByRole('link', { name: 'Solution Engineers' }).click();
  await page.getByRole('link', { name: 'John doe' }).first().click();
  await page.getByRole('link', { name: 'John doe' }).nth(1).click();
  await page.getByRole('link', { name: 'John doe' }).nth(2).click();
  await page.getByRole('link', { name: 'GitHub' }).click();
  await page.goto('https://curiosta.com/solution-engineers#');
  await page.getByRole('link', { name: 'About Us' }).click();
  await page.getByRole('link', { name: 'Curiosta' }).click();
});