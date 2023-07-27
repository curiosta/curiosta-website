import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://curiosta.com/');
  await page.getByRole('button', { name: 'My Account' }).click();
  await page.getByRole('menuitem', { name: 'Login' }).click();
  await page.getByPlaceholder('example@gmail.com').click();
  await page.getByPlaceholder('example@gmail.com').fill('temp@gmail.com');
  await page.getByPlaceholder('Your Curiosta password').click();
  await page.getByPlaceholder('Your Curiosta password').fill('123456789');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'My Account' }).click();

});