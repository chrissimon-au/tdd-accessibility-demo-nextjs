'use client';
import React from 'react';
import EnrolingForm from '@/enroling/enroling-form';
import Enrolments from '@/enroling/enrolments';

export default function Enroling() {
  const [enrolments, setEnrolments] = React.useState([] as Array<string>);
  const enrol = () => setEnrolments(['Accessibility 101']);

  return (
    <>
      <EnrolingForm onEnrol={enrol} />
      <Enrolments enrolments={enrolments} />
    </>
  );
}
