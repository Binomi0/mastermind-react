import { RecordType } from "./Records";

interface Props {
  record: RecordType;
}

const Record = ({ record }: Props) => {
  const { player, score, time } = record;

  return (
    <li>
      {player}: {score} ({time} segs.)
    </li>
  );
};

export default Record;
