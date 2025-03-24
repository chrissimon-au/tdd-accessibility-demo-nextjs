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
});
