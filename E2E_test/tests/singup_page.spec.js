import { test, expect } from '@playwright/test';

test('SignUP Page', async ({ page }) => {
  await page.goto('https://curiosta.com/');
  await page.getByRole('button', { name: 'My Account' }).click();
  await page.getByRole('menuitem', { name: 'Signup' }).click();
  await page.getByPlaceholder('John').click();
  await page.getByPlaceholder('John').press('CapsLock');
  await page.getByPlaceholder('John').fill('H');
  await page.getByPlaceholder('John').press('CapsLock');
  await page.getByPlaceholder('John').fill('Hari');
  await page.getByPlaceholder('Doe').click();
  await page.getByPlaceholder('Doe').press('CapsLock');
  await page.getByPlaceholder('Doe').fill('V');
  await page.getByPlaceholder('Doe').press('CapsLock');
  await page.getByPlaceholder('Doe').fill('Varma');
  await page.getByPlaceholder('example@gmail.com').click();
  await page.getByPlaceholder('example@gmail.com').press('CapsLock');
  await page.getByPlaceholder('example@gmail.com').fill('H');
  await page.getByPlaceholder('example@gmail.com').press('CapsLock');
  await page.getByPlaceholder('example@gmail.com').fill('Hari@gmail.com');
  await page.getByPlaceholder('Enter password').click();
  await page.getByPlaceholder('Enter password').fill('123456789');
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await page.getByRole('button', { name: 'My Account' }).click();
  await page.getByRole('menuitem', { name: 'Sign out' }).click();
});