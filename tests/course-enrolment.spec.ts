import { test, expect } from '@playwright/test';

test('Enroling in a Course', async ({ page }) => {
  await test.step('Given I am a registered student', async () => {
    await page.goto('');
  });

  await test.step('When I enrol in a course', async () => {
    const courseId = '1ca0289a-7125-4764-bef5-ef9731554717';
    const coursesList = page.getByRole('combobox', { name: 'Courses' });
    await expect(coursesList).toBeVisible();
    await expect(coursesList.getByRole('option', { name: 'Accessibility 101' })).toBeEnabled();
    await expect(coursesList).toHaveValue(courseId);
    const enrolButton = page.getByRole('button', { name: 'Enrol' });
    await expect(enrolButton).toBeEnabled();
    await enrolButton.click();
  });

  await test.step('Then I should be enroled in that course', async () => {
    await expect(page.getByRole('cell', { name: 'Accessibility 101' })).toBeVisible();
  });
});
