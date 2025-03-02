export interface Course {
  name: string;
  id: string;
}

interface Props {
  onEnrol: () => void;
}

export default function EnrolingForm({ onEnrol }: Props) {
  const course = { id: '1ca0289a-7125-4764-bef5-ef9731554717', name: 'Accessibility 101' };
  return (
    <>
      <label htmlFor="courses">Courses</label>
      <select id="courses">
        <option value={course.id}>{course.name}</option>
      </select>
      <button onClick={onEnrol}>Enrol</button>
    </>
  );
}
