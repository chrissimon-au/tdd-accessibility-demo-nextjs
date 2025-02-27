import { test, expect, Locator } from '@playwright/test';

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
    const enrolments = page.getByRole('table', { name: 'Enrolments' });
    await expect(enrolments).toBeVisible();
    await expect(enrolments.getByRole('cell', { name: 'Accessibility 101' })).toBeVisible();
  });
});

test('Reviewing available Courses', async ({ page }) => {
  const allCourses = [
    { name: 'Accessibility 101', id: '1ca0289a-7125-4764-bef5-ef9731554717' },
    { name: 'Front End Development 201', id: '260081c3-57b4-4d79-bbcb-4e7c43b31d3b' },
    { name: 'Test-Driven Development 101', id: 'a9a2fe0d-f8bf-4201-9684-b22e4c42d21d' },
  ];

  await page.route('*/**/courses', async (route) => {
    await route.fulfill({ json: allCourses });
  });

  await test.step('Given I am a registered student', async () => {
    await page.goto('');
  });

  let coursesList: Locator;

  await test.step('When I review available courses', async () => {
    coursesList = page.getByRole('combobox', { name: 'Courses' });
  });

  for (const course of allCourses) {
    await test.step(`Then I should see course ${course.name} in list`, async () => {
      await expect(coursesList.getByRole('option', { name: course.name })).toBeEnabled();
    });
  }
});
