interface Props {
  enrolments: Array<string>;
}

export default function Enrolments({ enrolments }: Props) {
  return (
    <table>
      <caption className="text-left text-2xl">Enrolments</caption>
      <tbody>
        {enrolments.map((enrolment, idx) => {
          return (
            <tr key={`enrolment-${idx}`}>
              <td>{enrolment}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
