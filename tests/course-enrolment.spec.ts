import { test, expect } from '@playwright/test';

test('Enroling in a Course', async ({ page }) => {
  await test.step('Given I am a registered student', async () => {
    await page.goto('');
  });

  await test.step('When I enrol in a course', async () => {
    const coursesList = page.getByRole('combobox', { name: 'Courses' });
    await expect(coursesList).toBeVisible();
    await expect(coursesList.getByRole('option', { name: 'Accessibility 101' })).toBeEnabled();
  });

  await test.step('Then I should be enroled in that course', async () => {

  });
});
