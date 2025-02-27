export interface Course {
  name: string;
  id: string;
}

interface Props {
  enrol: () => void;
  courses: Array<Course>;
}

const DEFAULT_COURSES = [{ name: 'Accessibility 101', id: '1ca0289a-7125-4764-bef5-ef9731554717' }];

export default function EnrolingForm({ enrol, courses }: Props) {
  return (
    <>
      <label htmlFor="courses">Courses</label>
      <select id="courses">
        { (courses ?? DEFAULT_COURSES).map(course =>
          <option key={course.id} value={course.id}>{course.name}</option>,
        )}
      </select>
      <button onClick={enrol}>Enrol</button>
    </>
  );
}
