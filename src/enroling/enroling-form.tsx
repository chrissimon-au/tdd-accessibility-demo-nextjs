export interface Course {
  name: string;
  id: string;
}

interface Props {
  onEnrol: (course: Course) => void;
  courses: Array<Course>;
}

export default function EnrolingForm({ onEnrol, courses }: Props) {
  const course = courses[0];
  const onEnrolClick = () => onEnrol(course);
  return course && (
    <>
      <label htmlFor="courses">Courses</label>
      <select id="courses">
        <option value={course.id}>{course.name}</option>
      </select>
      <button onClick={onEnrolClick}>Enrol</button>
    </>
  );
}
