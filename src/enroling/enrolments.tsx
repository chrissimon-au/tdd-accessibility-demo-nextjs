interface Props {
  enrolments: Array<string>;
}

export default function Enrolments({ enrolments }: Props) {
  return (
    <table>
      <caption>Enrolments</caption>
      <tbody>
        <tr>
          { enrolments.map((enrolment, idx) => {
            return (
              <td key={`enrolment-${idx}`}>{enrolment}</td>
            );
          }) }
        </tr>
      </tbody>
    </table>
  );
}
