interface Props {
  enrolments: Array<string>;
}

export default function Enrolments({ enrolments }: Props) {
  return (
    <table>
      <caption>Enrolments</caption>
      <thead>
        <tr>
          <th>Course</th>
          <th>Status</th>
          <th>Room</th>
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
