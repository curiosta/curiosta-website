import { test, expect } from '@playwright/test';

test('Home Page', async ({ page }) => {
  await page.goto('https://curiosta.com/');
  await page.getByRole('link', { name: 'Products', exact: true }).click();
  await page.goto('https://curiosta.com/');
  await page.getByRole('link', { name: 'Open Making' }).click();
  await page.goto('https://curiosta.com/');
  await page.getByRole('link', { name: 'Solution Engineers' }).click();x
  await page.goto('https://curiosta.com/');
  await page.getByRole('link', { name: 'Blog' }).click();
  await page.goto('https://curiosta.com/');
  await page.getByRole('combobox').selectOption('55');
  await page.getByRole('combobox').selectOption('74');
  await page.getByRole('button', { name: 'My Account' }).click();
  await page.getByRole('button', { name: 'My Account' }).click();
  await page.getByRole('link', { name: 'Shop Now' }).click();
  await page.goto('https://curiosta.com/');
  await page.getByRole('link', { name: 'Join as a manufacturers' }).click();
  await page.getByRole('link', { name: 'View all products' }).click();
  await page.getByRole('link', { name: 'Raspberry PI 4B+ Raspberry PI 4B+ Introducing the Raspberry PI 4... €24.00' }).click();
  await page.goto('https://curiosta.com/collection/featured');
  await page.getByRole('link', { name: 'Wi-Fi Stepper Wi-Fi Stepper The Wi-Fi Stepper is the perfe... €78.00' }).click();
  await page.goto('https://curiosta.com/collection/featured');
  await page.getByRole('link', { name: 'Dita Dita Introducing Dita, the newest d... €155.00' }).click();
  await page.goto('https://curiosta.com/');
  await page.getByRole('link', { name: 'View all products' }).click();
  await page.getByRole('link', { name: 'Latest Products' }).click();
  await page.getByRole('link', { name: 'Tigard Tigard Introducing the Tigard, the al... €55.00' }).click();
  await page.goto('https://curiosta.com/collection/featured');
  await page.goto('https://curiosta.com/');
  await page.getByRole('link', { name: 'About Us' }).click();
  await page.goto('https://curiosta.com/');
  await page.getByRole('link', { name: 'Contact Us' }).click();
  await page.getByRole('link', { name: 'info@curiosta.com' }).click();
  await page.goto('https://curiosta.com/');
  await page.getByRole('link', { name: 'GitHub' }).click();
  await page.goto('https://curiosta.com/');
});