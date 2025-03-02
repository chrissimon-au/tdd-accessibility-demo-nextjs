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
  const helpMsg = `Select the course you'd like to enrol in...`;
  return courses && (
    <form action={enrol}>
      <label htmlFor="course">Courses</label>
      <select id="course" name="course" defaultValue={helpMsg}>
        <option disabled>{ helpMsg }</option>
        { courses.map(course =>
          <option key={`course-${course.id}`} value={course.id}>{course.name}</option>,
        )}
      </select>
      <button>Enrol</button>
    </form>
  );
}
