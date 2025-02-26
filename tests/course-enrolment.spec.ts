import { test, expect } from '@playwright/test';

test('Enroling in a Course', async ({ page }) => {
  await test.step('Given I am a registered student', async () => {
    await page.goto('');
  });

  await test.step('When I enrol in a course', async () => {
    await expect(page.getByRole('combobox')).toBeVisible();
  });

  await test.step('Then I should be enroled in that course', async () => {

  });
});
