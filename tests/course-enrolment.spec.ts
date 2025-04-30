import { test, expect, Locator } from '@playwright/test';

async function getTableCell(table: Locator, row: Locator, columnHeading: string) {
  const headers = table.getByRole('rowgroup').nth(0).getByRole('cell');
  const headerCellsContent = await Promise.all((await headers.all()).map(l => l.textContent()));
  const idx = headerCellsContent.indexOf(columnHeading);
  const rowCells = row.getByRole('cell');
  const cell = rowCells.nth(idx);
  return cell;
}

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

    const row = enrolments.getByRole('row', { name: 'Accessibility 101' });
    await expect(row).toBeVisible();

    await expect(await getTableCell(enrolments, row, 'Course')).toHaveText('Accessibility 101');
    await expect(await getTableCell(enrolments, row, 'Status')).toHaveText('Submitted');
    await expect(await getTableCell(enrolments, row, 'Room')).toHaveText('Not yet allocated');
  });
});
