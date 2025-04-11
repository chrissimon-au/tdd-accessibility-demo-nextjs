import { test, expect } from '@playwright/experimental-ct-react';
import EnrolingForm, { Course } from '../../src/enroling/enroling-form';

test.describe('Enroling Form Component', () => {
  test('Can submit form', async ({ mount }) => {
    const courses = [
      {
        id: 'courseId',
        name: 'testCourse',
      },
    ];

    let enroledCourse = null;
    const onEnrol = (course: Course) => enroledCourse = course;

    const form = await mount(
      <EnrolingForm courses={courses} onEnrol={onEnrol} />,
    );

    const selector = form.getByRole('combobox', { name: 'Courses' });
    const enrolButton = form.getByRole('button', { name: 'Enrol' });

    await selector.selectOption(courses[0].name);

    await enrolButton.click();

    expect(enroledCourse).toStrictEqual(courses[0]);
  });

  test('Warn if course not selected on submit', async ({ mount }) => {
    const courses = [
      {
        id: 'courseId',
        name: 'testCourse',
      },
    ];

    let enroledCourse = null;
    const onEnrol = (course: Course) => enroledCourse = course;

    const form = await mount(
      <EnrolingForm courses={courses} onEnrol={onEnrol} />,
    );

    const selector = form.getByRole('combobox', { name: 'Courses' });
    const enrolButton = form.getByRole('button', { name: 'Enrol' });
    const validationMsgId = await selector.getAttribute('aria-describedby') ?? '';
    const validationMsg = form.locator(`#${validationMsgId}`);
    await expect(validationMsg).toBeHidden();

    await enrolButton.click();

    expect(enroledCourse).toBeNull();

    const msg = await selector.evaluate((e: HTMLInputElement) => e.validationMessage);
    expect(msg).not.toBe('');

    await expect(validationMsg).toBeVisible();
    await expect(validationMsg).toHaveRole('alert');
    await expect(validationMsg).toHaveText('Please select the course to enrol in.');
  });
});
