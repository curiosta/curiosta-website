import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  test.setTimeout(200000)
  await page.goto('https://curiosta.com/');
  await page.getByRole('link', { name: 'Products', exact: true }).click();
  await page.goto('https://curiosta.com/');
  await page.getByRole('link', { name: 'Open Making' }).click();
 
  await page.getByRole('link', { name: 'Join as a maker' }).click();
  await page.goto('https://curiosta.com/open-making');
  await page.getByRole('link', { name: 'Find out more' }).click();
  await page.goto('https://curiosta.com/open-making');
  await page.getByRole('link', { name: 'Check Product' }).click();  
  await page.goto('https://curiosta.com/open-making');
  await page.getByRole('link', { name: 'Discover Manufacturers near you' }).click();
  await page.goto('https://curiosta.com/open-making');
  await page.getByRole('link', { name: 'Enter the global build' }).click();
  await page.goto('https://curiosta.com/open-making');
  await page.getByRole('link', { name: 'About Us' }).click();
  await page.getByRole('link', { name: 'Contact Us' }).click();
  await page.getByRole('link', { name: 'Terms of use' }).click();
  await page.getByRole('link', { name: 'Facebook' }).click();
  await page.goto('https://curiosta.com/open-making');
  await page.getByRole('link', { name: 'Our Model' }).click();
  await page.goto('https://curiosta.com/open-making');
  await page.getByRole('link', { name: 'Manufacturers', exact: true }).click();
  await page.getByRole('link', { name: 'Join as a manufacturer' }).click();
  await page.goto('https://curiosta.com/open-making/manufacturers');
  await page.getByRole('link', { name: 'WowCarving' }).click();
  await page.goto('https://curiosta.com/open-making/manufacturers');
  await page.getByRole('link', { name: 'IDV Concepts Asia' }).click();
  await page.goto('https://curiosta.com/open-making');
  await page.getByRole('link', { name: 'Build', exact: true }).click();
  await page.goto('https://curiosta.com/open-making/build');
  await page.getByRole('link', { name: 'WoodFix' }).click();
  await page.goto('https://curiosta.com/open-making/build');
  await page.getByRole('link', { name: 'Collaboration' }).click();
  await page.goto('https://curiosta.com/open-making');
  await page.getByRole('link', { name: 'About Us' }).click();
  await page.getByRole('link', { name: 'Facebook' }).click();
});

