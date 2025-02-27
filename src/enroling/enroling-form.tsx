export interface Course {
  name: string;
  id: string;
}

interface Props {
  enrol: (course: Course) => void;
  courses: Array<Course>;
}

const DEFAULT_COURSES = [{ name: 'Accessibility 101', id: '1ca0289a-7125-4764-bef5-ef9731554717' }];

export default function EnrolingForm({ enrol, courses }: Props) {
  function submitEnrol(formData: FormData) {
    const courseId = formData.get('course') as string;
    const course = {
      id: courseId ?? '',
      name: courses.find(c => c.id == courseId)?.name ?? 'Course not found',
    };
    enrol(course);
  }
  return (
    <form action={submitEnrol}>
      <label htmlFor="course">Courses</label>
      <select id="course" name="course">
        { (courses ?? DEFAULT_COURSES).map(course =>
          <option key={course.id} value={course.id}>{course.name}</option>,
        )}
      </select>
      <button>Enrol</button>
    </form>
  );
}
