import { useEffect, useState } from "react";
import Record from "./Record";
import "../styles/records.scss";

export interface RecordType {
  player: string;
  score: number;
  time: number;
}

const Records = () => {
  const [records, setRecords] = useState<RecordType[]>([]);

  useEffect(() => {
    const _records = localStorage.getItem("records");
    if (!_records) return;

    const _recordsJSON = JSON.parse(_records);

    setRecords(_recordsJSON);
  }, []);

  return (
    <div className="records">
      <ol className="records-list">
        {records.length > 0 &&
          records.map((record) => (
            <Record key={record.player} record={record} />
          ))}
      </ol>
    </div>
  );
};

export default Records;
