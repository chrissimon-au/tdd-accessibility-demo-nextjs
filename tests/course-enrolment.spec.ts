import { test, expect } from '@playwright/test';

const allCourses = [
  { name: 'Accessibility 101', id: '1ca0289a-7125-4764-bef5-ef9731554717' },
  { name: 'Front End Development 201', id: '260081c3-57b4-4d79-bbcb-4e7c43b31d3b' },
  { name: 'Test-Driven Development 101', id: 'a9a2fe0d-f8bf-4201-9684-b22e4c42d21d' },
];

test.describe('Enroling in a Course', () => {
  for (const course of allCourses) {
    test(`Enroling in ${course.name}`, async ({ page }) => {
      await page.route('*/**/courses', async (route) => {
        await route.fulfill({ json: [course] });
      });

      await test.step('Given I am a registered student', async () => {
        await page.goto('');
      });

      await test.step('When I enrol in a course', async () => {
        const coursesList = page.getByRole('combobox', { name: 'Courses' });
        await expect(coursesList).toBeVisible();
        await expect(coursesList.getByRole('option', { name: course.name })).toBeEnabled();
        await expect(coursesList).toHaveValue(course.id);
        const enrolButton = page.getByRole('button', { name: 'Enrol' });
        await expect(enrolButton).toBeEnabled();
        await enrolButton.click();
      });

      await test.step('Then I should be enroled in that course', async () => {
        const enrolments = page.getByRole('table', { name: 'Enrolments' });
        await expect(enrolments).toBeVisible();
        await expect(enrolments.getByRole('cell', { name: 'Accessibility 101' })).toBeVisible();
      });
    });
  }
});
