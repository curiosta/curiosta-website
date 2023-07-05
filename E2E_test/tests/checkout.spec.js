import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

    
  await page.goto('https://curiosta.com/');
  await page.getByRole('navigation', { name: 'Global' }).getByText('Products Open Making Solution Engineers Blog').click();
  await page.getByRole('link', { name: 'Products', exact: true }).click();
  await page.getByRole('link', { name: 'Tomu Tomu Introducing the Tomu – the wor... €30.00' }).click();
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByPlaceholder('example@gmail.com').click();
  await page.getByPlaceholder('example@gmail.com').fill('stephan6gmail.com');
  await page.getByPlaceholder('example@gmail.com').press('ArrowLeft');
  await page.getByPlaceholder('example@gmail.com').press('ArrowLeft');
  await page.getByPlaceholder('example@gmail.com').press('ArrowLeft');
  await page.getByPlaceholder('example@gmail.com').press('ArrowLeft');
  await page.getByPlaceholder('example@gmail.com').press('ArrowLeft');
  await page.getByPlaceholder('example@gmail.com').press('ArrowLeft');
  await page.getByPlaceholder('example@gmail.com').press('ArrowLeft');
  await page.getByPlaceholder('example@gmail.com').press('ArrowLeft');
  await page.getByPlaceholder('example@gmail.com').press('ArrowLeft');
  await page.getByPlaceholder('example@gmail.com').press('Control+2');
  await page.getByPlaceholder('example@gmail.com').fill('stephan6@gmail.com');
  await page.getByPlaceholder('Your Curiosta password').click();
  await page.getByPlaceholder('Your Curiosta password').fill('123456789');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'My Account' }).click();
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await page.getByRole('button', { name: 'Remove' }).first().click();
  await page.getByRole('button', { name: 'Checkout' }).click({
    button: 'right'
  });
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.frameLocator('iframe[name="__privateStripeFrame5907"]').getByPlaceholder('MM / YY').click();
  await page.frameLocator('iframe[name="__privateStripeFrame5907"]').getByPlaceholder('1234 1234 1234 1234').click();
  await page.frameLocator('iframe[name="__privateStripeFrame5907"]').getByPlaceholder('1234 1234 1234 1234').fill('4242 4242 4242 42424');
  await page.frameLocator('iframe[name="__privateStripeFrame5907"]').getByPlaceholder('MM / YY').click();
  await page.frameLocator('iframe[name="__privateStripeFrame5907"]').getByPlaceholder('MM / YY').fill('03 / 33');
  await page.frameLocator('iframe[name="__privateStripeFrame5907"]').getByPlaceholder('CVC').click();
  await page.frameLocator('iframe[name="__privateStripeFrame5907"]').getByPlaceholder('CVC').fill('123');
  await page.locator('span').filter({ hasText: 'DHL₹1416.00 (inc. taxes)' }).first().click();
  await page.getByRole('button', { name: 'Confirm order' }).click();
  await page.goto('https://curiosta.com/orders');
  await page.getByRole('link', { name: 'View Order order_01H4K1SW3ATH34RXQ2MB4S2VRN' }).click();
  await page.getByRole('link', { name: 'Products' }).click();
});