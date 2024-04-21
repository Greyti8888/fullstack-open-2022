import { useEffect, useState } from "react";

import { Diagnosis, Entry } from "../../../types";

import diagnosesService from "../../../services/diagnoses";

interface Props {
  entry: Entry;
  children?: React.ReactNode;
}

const BaseEntry = ({ entry, children }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | undefined>();

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    };
    fetchDiagnoses();
  }, []);

  const listOfDiagnoses = entry.diagnosisCodes && (
    <ul>
      {entry.diagnosisCodes?.map((code) => {
        const diagnosis = diagnoses?.find(
          (diagnosis) => diagnosis.code === code,
        );
        if (diagnosis) {
          return (
            <li key={diagnosis.code}>
              {diagnosis.code} {diagnosis.name}
            </li>
          );
        } else return null;
      })}
    </ul>
  );

  return (
    <div
      style={{ marginBottom: "5px", border: "1px solid black", padding: "5px" }}
    >
      <div>{entry.date}</div>
      <div>{entry.description}</div>
      {listOfDiagnoses}
      {children}
      <br />
      <div>diagnosed by: {entry.specialist}</div>
    </div>
  );
};

export default BaseEntry;
