import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://curiosta.com/');
  await page.getByRole('button', { name: 'My Account' }).click();
  await page.getByRole('menuitem', { name: 'Login' }).click();
  await page.getByPlaceholder('example@gmail.com').click();
  await page.getByPlaceholder('example@gmail.com').fill('harivarma123@gmail.com');
  await page.getByPlaceholder('Your Curiosta password').click();
  await page.getByPlaceholder('Your Curiosta password').fill('123454321');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Products', exact: true }).click();
  await page.getByRole('link', { name: 'PineTime SmartWatch (Sealed) PineTime SmartWatch (Sealed) This PineTime SmartWatch (Seal... ₹2500.00' }).click();
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.frameLocator('iframe[name="__privateStripeFrame3007"]').getByPlaceholder('1234 1234 1234 1234').click();
  await page.frameLocator('iframe[name="__privateStripeFrame3007"]').getByPlaceholder('1234 1234 1234 1234').fill('4242 4242 4242 42422');
  await page.frameLocator('iframe[name="__privateStripeFrame3007"]').getByPlaceholder('MM / YY').click();
  await page.frameLocator('iframe[name="__privateStripeFrame3007"]').getByPlaceholder('MM / YY').fill('10 / 25');
  await page.frameLocator('iframe[name="__privateStripeFrame3007"]').getByPlaceholder('CVC').click();
  await page.frameLocator('iframe[name="__privateStripeFrame3007"]').getByPlaceholder('CVC').fill('145');
  await page.getByRole('button', { name: 'Confirm order' }).click();
  await page.goto('https://curiosta.com/orders');
  await page.getByRole('link', { name: 'View Order order_01H4T6NSAN8FTAFRWW83EDDV99' }).click();
  await page.getByRole('link', { name: 'Curiosta' }).click();
});