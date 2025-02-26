import { test, expect } from '@playwright/test';

test('Confirm playwright test watching', () => {

});

test('Page has Title', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/University Registration/);
});
