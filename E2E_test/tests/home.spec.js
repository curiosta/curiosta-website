import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  test.setTimeout(200000)
  await page.goto('about:blank');
  await page.goto('https://curiosta.com/');
  await page.getByRole('link', { name: 'Curiosta' }).click();
  await page.getByRole('link', { name: 'Products', exact: true }).click();
  await page.goto('https://curiosta.com/');
  await page.getByRole('link', { name: 'Open Making' }).click();
  await page.goto('https://curiosta.com/');
  await page.getByRole('link', { name: 'Solution Engineers' }).click();
  await page.goto('https://curiosta.com/');
  await page.getByRole('link', { name: 'Blog' }).click();
  await page.goto('https://curiosta.com/');
  await page.getByRole('combobox').selectOption('55');
  await page.getByRole('combobox').selectOption('74');
  await page.getByRole('combobox').selectOption('82');
  await page.getByRole('combobox').selectOption('102');
  await page.getByRole('combobox').selectOption('109');
  await page.getByRole('combobox').selectOption('178');
  await page.getByRole('combobox').selectOption('209');
  await page.getByRole('combobox').selectOption('236');
  await page.getByRole('button', { name: 'My Account' }).click();
  await page.getByRole('menuitem', { name: 'Browsing as Guest' }).click();
  await page.getByRole('menuitem', { name: 'Cart 0' }).click();
  await page.locator('.fixed > .hidden').click();
  await page.getByRole('button', { name: 'My Account' }).click();

  await page.getByRole('link', { name: 'Shop Now' }).click();
  await page.goto('https://curiosta.com/');
  await page.getByRole('link', { name: 'Join as a manufacturers' }).click();
  await page.goto('https://curiosta.com/');
  await page.getByRole('link', { name: 'View all products' }).click();
 
  await page.getByRole('link', { name: 'Raspberry PI 4B+ Raspberry PI 4B+ Introducing the Raspberry PI 4... $26.00' }).click();
  await page.goto('https://curiosta.com/collection/featured');
  await page.getByRole('listitem').filter({ hasText: 'Latest Products' }).click();
  await page.getByRole('link', { name: 'I²CMini I²CMini NET, JavaScript, and Python T... $30.00' }).click();
  await page.goto('https://curiosta.com/collection/latest-products');
  await page.goto('https://curiosta.com/collection/featured');
  await page.goto('https://curiosta.com/');
  await page.getByRole('link', { name: 'About Us' }).click();
  await page.goto('https://curiosta.com/');
  await page.getByRole('link', { name: 'Contact Us' }).click();
  await page.getByRole('link', { name: 'info@curiosta.com' }).click();
  await page.getByRole('main').click();
  await page.getByRole('link', { name: 'Terms of use' }).click();
  await page.getByRole('link', { name: 'Facebook' }).click();
  await page.goto('https://curiosta.com/');
  await page.getByRole('link', { name: 'Instagram' }).click();
  await page.goto('https://curiosta.com/');
});