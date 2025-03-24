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
    if (!!!courseId) {
      return;
    }
    const course = {
      id: courseId,
      name: courses.find(c => c.id == courseId)?.name ?? '',
    };
    onEnrol(course);
  }
  const helpMsg = `Select the course you'd like to enrol in...`;
  return courses && (
    <form action={enrol}>
      <div>
        <label htmlFor="course" className="block mb-3 text-2xl">Courses</label>
        <select id="course" name="course" defaultValue={helpMsg} className="block mb-3 px-2 py-1 border rounded-md border-gray-200 bg-white">
          <option disabled>{helpMsg}</option>
          {courses.map(course =>
            <option key={`course-${course.id}`} value={course.id}>{course.name}</option>,
          )}
        </select>
      </div>
      <div>
        <button className="px-3 py-1 rounded-md bg-blue-600 text-white">Enrol</button>
      </div>
    </form>
  );
}
