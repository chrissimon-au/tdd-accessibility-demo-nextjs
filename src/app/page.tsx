'use client';
import React from 'react';

export default function Home() {
  const [enrolments, setEnrolments] = React.useState([] as Array<string>);
  const enrol = () => setEnrolments(['Accessibility 101']);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <h1>University Registration</h1>

        <label htmlFor="courses">Courses</label>
        <select id="courses">
          <option value="1ca0289a-7125-4764-bef5-ef9731554717">Accessibility 101</option>
        </select>
        <button onClick={enrol}>Enrol</button>

        <table>
          <tbody>
            {enrolments.map((enrolment, idx) => {
              return (
                <tr key={`enrolment-${idx}`}>
                  <td>{enrolment}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
