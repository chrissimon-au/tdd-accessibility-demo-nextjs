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
    const enrolments = page.getByRole('table', { name: 'Enrolments' });
    await expect(enrolments).toBeVisible();

    const headers = enrolments.getByRole('rowgroup').nth(0).getByRole('cell');
    await expect(headers).toHaveCount(3);
    const headerCellsContent = await Promise.all((await headers.all()).map(l => l.textContent()));
    const courseIdx = headerCellsContent.indexOf('Course');
    const statusIdx = headerCellsContent.indexOf('Status');
    const roomIdx = headerCellsContent.indexOf('Room');

    const enrolmentCourse = enrolments.getByRole('row', { name: 'Accessibility 101' });
    await expect(enrolmentCourse).toBeVisible();
    const enrolmentCourseCells = enrolmentCourse.getByRole('cell');
    const course = enrolmentCourseCells.nth(courseIdx);
    const status = enrolmentCourseCells.nth(statusIdx);
    const room = enrolmentCourseCells.nth(roomIdx);
    await expect(course).toHaveText('Accessibility 101');
    await expect(status).toHaveText('Submitted');
    await expect(room).toHaveText('Not yet allocated');
  });
});
