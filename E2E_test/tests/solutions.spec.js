import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://curiosta.com/');
  await page.getByRole('link', { name: 'Solution Engineers' }).click();
  await page.getByRole('link', { name: 'Facebook' }).click();
  await page.goto('https://curiosta.com/solution-engineers');
  await page.getByRole('link', { name: 'Instagram' }).click();
  await page.goto('https://curiosta.com/solution-engineers');
  await page.getByRole('link', { name: 'Twitter' }).click();
  await page.goto('https://curiosta.com/solution-engineers');
  await page.getByRole('link', { name: 'GitHub' }).click();
  await page.goto('https://curiosta.com/solution-engineers');
  await page.getByRole('link', { name: 'YouTube' }).click();
  await page.goto('https://curiosta.com/solution-engineers');
  await page.getByRole('link', { name: 'John doe' }).first().click();
  await page.getByRole('link', { name: 'John doe' }).first().click();
  await page.getByRole('link', { name: 'About Us' }).click();
  await page.getByRole('link', { name: 'Contact Us' }).click();
  await page.getByRole('link', { name: 'Terms of use' }).click();
  await page.getByRole('link', { name: 'Privacy Policy' }).click();
  await page.getByRole('link', { name: 'Shipping policy' }).click();
  await page.getByRole('link', { name: 'Return policy' }).click();
  await page.getByRole('link', { name: 'Solution Engineers' }).click();
  await page.getByRole('link', { name: 'Curiosta' }).click();
});