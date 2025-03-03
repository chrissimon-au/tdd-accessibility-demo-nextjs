interface Props {
  enrolments: Array<string>;
}

export default function Enrolments({ enrolments }: Props) {
  return (
    <table className="w-full table-fixed">
      <caption className="text-left text-2xl">Enrolments</caption>
      <thead>
        <tr>
          <th className="text-left m-2 w-[50%]">Course</th>
          <th className="text-left m-2">Status</th>
          <th className="text-left m-2">Room</th>
        </tr>
      </thead>
      <tbody>
        {enrolments.map((enrolment, idx) => {
          return (
            <tr key={`enrolment-${idx}`}>
              <td>{enrolment}</td>
              <td>Submitted</td>
              <td>Not yet allocated</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
