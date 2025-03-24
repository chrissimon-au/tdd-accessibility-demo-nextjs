import { test, expect, Locator, Page } from '@playwright/test';

interface Course {
  id: string;
  name: string;
}

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

async function GivenIAmARegisteredStudent(page: Page) {
  await test.step('Given I am a registered student', async () => {
    await page.goto('');
  });
}

async function WhenIEnrolInACourse(page: Page, course: Course) {
  await test.step(`When I enrol in ${course.name}`, async () => {
    const coursesList = page.getByRole('combobox', { name: 'Courses' });
    await expect(coursesList).toBeVisible();
    await expect(coursesList.getByRole('option', { name: course.name })).toBeEnabled();
    await coursesList.selectOption(course.name);
    await expect(coursesList).toHaveValue(course.id);
    const enrolButton = page.getByRole('button', { name: 'Enrol' });
    await expect(enrolButton).toBeEnabled();
    await enrolButton.click();
  });
}

async function ThenIShouldBeEnroledInThatCourse(page: Page, course: Course) {
  await test.step(`Then I should be enroled in ${course.name}`, async () => {
    const enrolments = page.getByRole('table', { name: 'Enrolments' });
    await expect(enrolments).toBeVisible();
    await expect(enrolments.getByRole('cell', { name: course.name })).toBeVisible();
  });
}

test.describe('Enroling in a Course', () => {
  for (const course of allCourses) {
    test(`Enroling in ${course.name}`, async ({ page }) => {
      await setupCourseMocks(page);

      await GivenIAmARegisteredStudent(page);

      await WhenIEnrolInACourse(page, course);

      await ThenIShouldBeEnroledInThatCourse(page, course);
    });
  }
});

test('Enroling in Multiple Courses', async ({ page }) => {
  await setupCourseMocks(page);

  await GivenIAmARegisteredStudent(page);

  for (const course of allCourses) {
    await WhenIEnrolInACourse(page, course);
  }

  for (const course of allCourses) {
    await ThenIShouldBeEnroledInThatCourse(page, course);
  }
});

test('Reviewing available Courses', async ({ page }) => {
  await setupCourseMocks(page);

  await GivenIAmARegisteredStudent(page);

  let coursesList: Locator;

  await test.step('When I review available courses', async () => {
    coursesList = page.getByRole('combobox', { name: 'Courses' });
  });

  test.step('Then I should be guided to select a course', async () => {
    const instructions = 'Select the course you\'d like to enrol in...';
    await expect(coursesList.getByRole('option', { name: instructions })).toBeDisabled();
    await expect(coursesList).toHaveValue('');
  });

  for (const course of allCourses) {
    await test.step(`Then I should see course ${course.name} in list`, async () => {
      await expect(coursesList.getByRole('option', { name: course.name })).toBeEnabled();
    });
  }
});
