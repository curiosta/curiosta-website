import { test, expect } from '@playwright/test';

test('Signup Page', async ({ page }) => {
  await page.goto('https://curiosta.com/');
  await page.getByRole('button', { name: 'My Account' }).click();
  await page.getByRole('menuitem', { name: 'Signup' }).click();
  await page.getByPlaceholder('John').click();
  await page.getByPlaceholder('John').fill('specenr');
  await page.getByPlaceholder('Doe').click();
  await page.getByPlaceholder('Doe').fill('jhon');
  await page.getByPlaceholder('example@gmail.com').click();
  await page.getByPlaceholder('example@gmail.com').fill('temp@gmail.com');
  await page.getByPlaceholder('Enter password').click();
  await page.getByPlaceholder('Enter password').fill('123456789');
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await page.getByRole('button', { name: 'My Account' }).click();
  await page.getByRole('menuitem', { name: 'Signed in as temp@gmail.com' }).click();
});