import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://curiosta.com/');
  await page.getByRole('link', { name: 'Blog' }).click();
  await page.getByRole('link', { name: 'The rise of robots: how advanced technology is changing' }).click();
  await page.getByRole('link', { name: 'Creating sustainable cities and the role of green urbanism' }).click();
  await page.getByRole('link', { name: 'Exploring the intersection of technology and art' }).click();
  await page.getByRole('link', { name: 'GitHub' }).click();
  await page.goto('https://curiosta.com/blog/exploring-the-intersection-of-technology-and-art');
  await page.getByRole('link', { name: 'Blog' }).click();
});
