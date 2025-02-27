interface Props {
  enrol: () => void;
}

export default function EnrolingForm({ enrol }: Props) {
  return (
    <>
      <label htmlFor="courses">Courses</label>
      <select id="courses">
        <option value="1ca0289a-7125-4764-bef5-ef9731554717">Accessibility 101</option>
      </select>
      <button onClick={enrol}>Enrol</button>
    </>
  );
}
