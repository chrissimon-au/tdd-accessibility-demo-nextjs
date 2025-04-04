import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Confirm playwright test watching', () => {

});

test('Page has Title', async ({ page }) => {
  await page.goto('');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/University Registration/);
});

test('Page has Heading', async ({ page }) => {
  await page.goto('');

  await expect(page.getByRole('heading', { name: 'University Registration', level: 1 })).toBeVisible();
});

test('Page has no Accessibility Issues', async ({ page }) => {
  await page.goto('');

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
