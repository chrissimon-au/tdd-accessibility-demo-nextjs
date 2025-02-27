'use client';
import { useEffect, useState } from 'react';
import EnrolingForm, { Course } from '@/enroling/enroling-form';
import Enrolments from '@/enroling/enrolments';

export default function Enroling() {
  const [enrolments, setEnrolments] = useState([] as Array<string>);
  const enrol = () => setEnrolments(['Accessibility 101']);

  const [courses, setCourses] = useState([] as Array<Course>);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch(
        `/courses`,
      );

      const courses = response.ok ? await response.json() : null;

      setCourses(courses);
    };

    fetchCourses();
  }, [courses]);

  return (
    <>
      <EnrolingForm enrol={enrol} courses={courses} />
      <Enrolments enrolments={enrolments} />
    </>
  );
}
