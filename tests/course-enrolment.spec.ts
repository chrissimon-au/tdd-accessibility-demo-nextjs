import { test, expect, Locator, Page } from '@playwright/test';

const allCourses = [
  { name: 'Accessibility 101', id: '1ca0289a-7125-4764-bef5-ef9731554717' },
  { name: 'Front End Development 201', id: '260081c3-57b4-4d79-bbcb-4e7c43b31d3b' },
  { name: 'Test-Driven Development 101', id: 'a9a2fe0d-f8bf-4201-9684-b22e4c42d21d' },
];

async function setupCourseMocks(page: Page) {
  await page.route('*/**/courses', async (route) => {
    await route.fulfill({ json: allCourses });
  });
}

test.describe('Enroling in a Course', () => {
  for (const course of [allCourses[0]]) {
    test(`Enroling in ${course.name}`, async ({ page }) => {
      await setupCourseMocks(page);

      await test.step('Given I am a registered student', async () => {
        await page.goto('');
      });

      await test.step('When I enrol in a course', async () => {
        const coursesList = page.getByRole('combobox', { name: 'Courses' });
        await expect(coursesList).toBeVisible();
        const desiredCourse = coursesList.getByRole('option', { name: course.name });
        await expect(desiredCourse).toBeEnabled();
        await coursesList.selectOption(course.name);
        await expect(coursesList).toHaveValue(course.id);
        const enrolButton = page.getByRole('button', { name: 'Enrol' });
        await expect(enrolButton).toBeEnabled();
        await enrolButton.click();
      });

      await test.step('Then I should be enroled in that course', async () => {
        const enrolments = page.getByRole('table', { name: 'Enrolments' });
        await expect(enrolments).toBeVisible();
        await expect(enrolments.getByRole('cell', { name: course.name })).toBeVisible();
      });
    });
  }
});

test('Reviewing available Courses', async ({ page }) => {
  await setupCourseMocks(page);

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
