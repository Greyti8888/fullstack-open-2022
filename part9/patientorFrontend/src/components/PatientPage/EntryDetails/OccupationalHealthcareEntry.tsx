import BaseEntry from "./BaseEntry";

import { OccupationalHealthcareEntry as OHE } from "../../../types";

interface Props {
  entry: OHE;
}

const OccupationalHealthcareEntry = ({ entry }: Props) => {
  return (
    <BaseEntry entry={entry}>
      <div>empoyer: {entry.employerName}</div>
      {entry.sickLeave && (
        <div>
          sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
        </div>
      )}
    </BaseEntry>
  );
};

export default OccupationalHealthcareEntry;
