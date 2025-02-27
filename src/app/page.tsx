'use client';
import React from 'react';
import EnrolingForm from '@/enroling/enroling-form';
import Enrolments from '@/enroling/enrolments';

export default function Home() {
  const [enrolments, setEnrolments] = React.useState([] as Array<string>);
  const enrol = () => setEnrolments(['Accessibility 101']);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <h1>University Registration</h1>

        <EnrolingForm onEnrol={enrol} />

        <Enrolments enrolments={enrolments} />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
