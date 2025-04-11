import { useState, FormEvent } from 'react';

export interface Course {
  name: string;
  id: string;
}

interface Props {
  onEnrol: (course: Course) => void;
  courses: Array<Course>;
}

export default function EnrolingForm({ onEnrol, courses }: Props) {
  function enrol(formData: FormData) {
    const courseId = formData.get('course') as string;
    const course = {
      id: courseId,
      name: courses.find(c => c.id == courseId)?.name ?? '',
    };
    onEnrol(course);
  }

  const [isInvalid, setIsInvalid] = useState(false);
  function onInvalid(e: FormEvent) {
    e.preventDefault();
    setIsInvalid(true);
  }

  const helpMsg = `Select the course you'd like to enrol in...`;

  return courses && (
    <form action={enrol}>
      <div>
        <label htmlFor="course" className="block mb-3 text-2xl">Courses</label>
        <select id="course" onInvalid={onInvalid} aria-describedby="course-errors" name="course" required defaultValue="" className="block px-2 py-1 border rounded-md border-gray-200 bg-white">
          <option value="" disabled>{helpMsg}</option>
          {courses.map(course =>
            <option key={`course-${course.id}`} value={course.id}>{course.name}</option>,
          )}
        </select>
        {isInvalid && (
          <div id="course-errors" className="bg-error px-3 py-1 pt-none text-sm rounded-lg rounded-tl-none rounded-tr-none">
            Please select the course to enrol in.
          </div>
        )}
      </div>
      <div className="mt-3">
        <button className="px-3 py-1 rounded-md bg-blue-600 text-white">Enrol</button>
      </div>
    </form>
  );
}
