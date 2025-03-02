'use client';
import { useState, useEffect } from 'react';
import EnrolingForm, { Course } from '@/enroling/enroling-form';
import Enrolments from '@/enroling/enrolments';

export default function Enroling() {
  const [enrolments, setEnrolments] = useState([] as Array<string>);
  const enrol = (course: Course) => setEnrolments(enrolments.concat([course.name]));

  const [courses, setCourses] = useState([] as Array<Course>);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch(
        `/courses`,
      );

      const courses = await response.json();

      setCourses(courses);
    };

    fetchCourses();
  }, []);

  return (
    <>
      <EnrolingForm onEnrol={enrol} courses={courses} />
      <Enrolments enrolments={enrolments} />
    </>
  );
}
