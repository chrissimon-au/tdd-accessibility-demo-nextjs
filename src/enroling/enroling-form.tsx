export interface Course {
  name: string;
  id: string;
}

interface Props {
  onEnrol: () => void;
  courses: Array<Course>;
}

export default function EnrolingForm({ onEnrol, courses }: Props) {
  const course = courses[0];
  return course && (
    <>
      <label htmlFor="courses">Courses</label>
      <select id="courses">
        <option value={course.id}>{course.name}</option>
      </select>
      <button onClick={onEnrol}>Enrol</button>
    </>
  );
}
